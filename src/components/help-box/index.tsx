import React from 'react';
import {
  Box,
  IconButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Text,
  UnorderedList,
  ListItem,
  Link,
} from '@chakra-ui/react';
import { FiInfo } from 'react-icons/fi';
import { useSession } from '@roq/nextjs';

export const HelpBox: React.FC = () => {
  const ownerRoles = ['Admin'];
  const roles = ['Customer', 'Owner', 'Fleet Manager', 'Admin'];
  const applicationName = 'OttO';
  const tenantName = 'Company';
  const githubUrl = process.env.NEXT_PUBLIC_GITHUB_URL;
  const userStories = `User Story 1:
As an Admin, I want to create a Company, so that I can manage the car booking services.

User Story 2:
As an Admin, I want to invite Owners and Fleet Managers to the application, so that they can manage their respective responsibilities.

User Story 3:
As an Owner, I want to view and manage the list of Fleet Managers, so that I can ensure the right people are managing the cars.

User Story 4:
As a Fleet Manager, I want to add, update, and delete cars in the system, so that the available cars are accurately represented.

User Story 5:
As a Fleet Manager, I want to view and manage the list of available cars, so that I can ensure the cars are ready for booking.

User Story 6:
As a Customer, I want to create an account, so that I can book cars.

User Story 7:
As a Customer, I want to view the list of available cars near me, so that I can choose a car to book.

User Story 8:
As a Customer, I want to book a car, so that I can use it for my needs.

User Story 9:
As a Customer, I want to view and manage my bookings, so that I can keep track of my car usage.

User Story 10:
As a Fleet Manager, I want to view and manage the bookings of the cars, so that I can ensure the cars are being used efficiently.`;

  const { session } = useSession();
  if (!process.env.NEXT_PUBLIC_SHOW_BRIEFING || process.env.NEXT_PUBLIC_SHOW_BRIEFING === 'false') {
    return null;
  }
  return (
    <Box width={1} position="fixed" left="30px" bottom="20px" zIndex={3}>
      <Popover placement="top-end">
        <PopoverTrigger>
          <IconButton
            aria-label="Help Info"
            icon={<FiInfo />}
            bg="blue.800"
            color="white"
            _hover={{ bg: 'blue.800' }}
            _active={{ bg: 'blue.800' }}
            _focus={{ bg: 'blue.800' }}
          />
        </PopoverTrigger>
        <PopoverContent w="50vw" h="70vh">
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>App Briefing</PopoverHeader>
          <PopoverBody overflowY="auto">
            <Text mb="2">Hi there!</Text>
            <Text mb="2">
              Welcome to {applicationName}, your freshly generated B2B SaaS application. This in-app briefing will guide
              you through your application.
            </Text>
            <Text mb="2">You can use {applicationName} with one of these roles:</Text>
            <UnorderedList mb="2">
              {roles.map((role) => (
                <ListItem key={role}>{role}</ListItem>
              ))}
            </UnorderedList>
            {session?.roqUserId ? (
              <Text mb="2">You are currently logged in as a {session?.user?.roles?.join(', ')}.</Text>
            ) : (
              <Text mb="2">
                Right now, you are not logged in. The best way to start your journey is by signing up as{' '}
                {ownerRoles.join(', ')} and to create your first {tenantName}.
              </Text>
            )}
            <Text mb="2">
              {applicationName} was generated based on these user stories. Feel free to try them out yourself!
            </Text>
            <Box mb="2" whiteSpace="pre-wrap">
              {userStories}
            </Box>
            <Text mb="2">
              If you are happy with the results, then you can get the entire source code here:{' '}
              <Link href={githubUrl} color="cyan.500" isExternal>
                {githubUrl}
              </Link>
            </Text>
            <Text mb="2">
              Console Dashboard: For configuration and customization options, access our console dashboard. Your project
              has already been created and is waiting for your input. Check your emails for the invite.
            </Text>
            <Text mb="2">
              <Link href="https://console.roq.tech" color="cyan.500" isExternal>
                ROQ Console
              </Link>
            </Text>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  );
};
