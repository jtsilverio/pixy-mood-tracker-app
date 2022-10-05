import { useState } from 'react';
import { Platform, TextInput, TouchableOpacity, View } from 'react-native';
import { Check } from 'react-native-feather';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { v4 as uuidv4 } from 'uuid';
import Button from '../components/Button';
import DismissKeyboard from '../components/DismisKeyboard';
import LinkButton from '../components/LinkButton';
import ModalHeader from '../components/ModalHeader';
import TextInputLabel from '../components/TextInputLabel';
import useColors from '../hooks/useColors';
import useHaptics from '../hooks/useHaptics';
import { useSegment } from '../hooks/useSegment';
import { COLOR_NAMES, Tag as ITag, useSettings } from '../hooks/useSettings';
import { useTranslation } from '../hooks/useTranslation';
import { RootStackScreenProps } from '../types';

const REGEX_EMOJI = /\p{Emoji}/u;

export const TagCreate = ({ navigation, route }: RootStackScreenProps<'TagCreate'>) => {
  const { t } = useTranslation()
  const colors = useColors()
  const haptics = useHaptics()
  const insets = useSafeAreaInsets();
  const segment = useSegment()
  const { setSettings } = useSettings()
  
  const [tempTag, setTempTag] = useState<ITag>({
    id: uuidv4(),
    title: '',
    color: Object.keys(colors.tags)[0] as ITag['color'],
  });
  
  const onCreate = () => {
    if (tempTag.title.length >= 30) return;

    segment.track('tag_create', {
      titleLength: tempTag.title.length,
      color: tempTag.color,
      containsEmoji: REGEX_EMOJI.test(tempTag.title)
    })

    setTempTag({
      id: uuidv4(),
      title: '',
      color: Object.keys(colors.tags)[0] as ITag['color'],
    })

    setSettings(settings => ({
      ...settings,
      tags: [...settings.tags, tempTag]
    }))

    navigation.goBack();
  }
  
  return (
    <DismissKeyboard>
      <View style={{
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor: colors.background,
        marginTop: Platform.OS === 'android' ? insets.top : 0,
      }}>
        <ModalHeader
          title={t('create_tag')}
          right={
            <LinkButton 
              onPress={() => {
                navigation.goBack();
              }}
              type='primary'
            >{t('save')}</LinkButton>
          }
          left={
            <LinkButton 
              onPress={() => {
                navigation.goBack();
              }}
              type='primary'
              >{t('cancel')}</LinkButton>
          }
        />
          <View 
            style={{ 
              flex: 1, 
              padding: 20,
            }}
          >
          <TextInputLabel>{t('title')}</TextInputLabel>
          <TextInput
            autoCorrect={false}
            style={{
              fontSize: 17,
              color: colors.textInputText,
              backgroundColor: colors.textInputBackground,
              width: '100%',
              padding: 16,
              borderRadius: 8,
            }}
            placeholder={t('tags_add_placeholder')}
            placeholderTextColor={colors.textInputPlaceholder}
            maxLength={30}
            value={tempTag.title}
            onChangeText={text => {
              setTempTag(tempTag => ({
                ...tempTag,
                title: text,
              }))
            }}
          />
          <TextInputLabel>{t('color')}</TextInputLabel>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              alignItems: 'center',
              width: '100%',
              padding: 16,
              backgroundColor: colors.cardBackground,
              borderRadius: 16,
            }}
          >
            {COLOR_NAMES.map(colorName => (
              <TouchableOpacity
                key={colorName}
                style={{
                  flex: 1,
                  flexBasis: `${(100 / 7) - 2}%`,
                  maxWidth: `${(100 / 7) - 2}%`,
                  aspectRatio: 1,
                  borderRadius: 100,
                  backgroundColor: colors.tags[colorName].dot,
                  justifyContent: 'center',
                  alignItems: 'center',
                  margin: '1%',
                }}
                onPress={() => {
                  haptics.selection();
                  setTempTag(tempTag => ({
                    ...tempTag,
                    color: colorName,
                  }));
                }}
                activeOpacity={0.8}
              >
                {tempTag.color === colorName && (
                  <Check width={22} height={22} color={colors.tags[colorName].text} />
                )}
              </TouchableOpacity>
            ))}
          </View>
          <Button
            style={{
              marginTop: 16,
            }}
            onPress={onCreate}
            disabled={tempTag.title.length === 0 || tempTag.title.length > 30}
          >{t('create')}</Button>
        </View>
      </View>
    </DismissKeyboard>
  );
}