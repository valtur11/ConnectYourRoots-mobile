import React from 'react';
import { TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { VStack, Box, Text } from '@gluestack-ui/themed';

const DEFAULT_SESSION_NAMES: string[] = [
  'grand-canyon',
  'yosemite',
  'yellowstone',
  'disneyland',
  'golden-gate-bridge',
  'monument-valley',
  'death-valley',
  'brooklyn-bridge',
  'hoover-dam',
  'lake-tahoe',
];

type Contact = {
  sessionName: string;
  displayName: string;
  roleType: number;
  contactName: string;
};

type VideoChatScreenProps = {
  route: any;
  navigation: any;
};

const contacts: Contact[] = [
  { sessionName: "rdadj", displayName: "Контакт 5", roleType: 1, contactName: "Контакт 1" },
  { sessionName: "rdadj1", displayName: "Контакт 6", roleType: 0, contactName: "Контакт 2" },
  { sessionName: "rdadj2", displayName: "Контакт 7", roleType: 1, contactName: "Контакт 3" },
  { sessionName: "rdadj", displayName: "Контакт 8", roleType: 0, contactName: "Контакт 4" }
];

export default function JoinScreen({ route, navigation }: VideoChatScreenProps): JSX.Element {
  const isJoin: boolean = route?.params?.isJoin;

  const checkTextInput = (contact: Contact): void => {
    const sessionIdleTimeoutMins: number = 30;
    navigation.navigate('VideoCall', {
      sessionName: contact.sessionName,
      displayName: contact.displayName,
      roleType: contact.roleType,
      sessionIdleTimeoutMins
    });
  };

  return (
    <VStack marginTop={30} justifyContent="center" alignItems="center" space="sm" reversed={false}>
      {contacts?.map((contact: Contact, i: number) => (
        <TouchableOpacity key={i} onPress={() => checkTextInput(contact)}>
          <Box borderRadius="$md" bg="#016FB9" justifyContent='center' alignItems="center" height={200} width={200}>
            <Text color="white" fontSize={20}>{contact.contactName}</Text>
            <Icon name="user" size={80} color="white" />
          </Box>
        </TouchableOpacity>
      ))}
    </VStack>
  );
}
