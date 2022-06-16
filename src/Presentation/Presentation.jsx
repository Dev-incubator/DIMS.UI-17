import {
  FlexBox,
  Heading,
  OrderedList,
  ListItem,
  FullScreen,
  Progress,
  Appear,
  Slide,
  Deck,
  Box,
  Notes,
  Text,
} from 'spectacle';
import logo from '../assets/img/education.svg';

const theme = {
  fonts: {
    header: '"Open Sans Condensed", Helvetica, Arial, sans-serif',
    text: '"Open Sans Condensed", Helvetica, Arial, sans-serif',
  },
};
const template = () => (
  <FlexBox justifyContent='space-between' position='absolute' bottom={0} width={1}>
    <Box padding='0 1em'>
      <FullScreen />
    </Box>
    <Box padding='1em'>
      <Progress />
    </Box>
  </FlexBox>
);

export const Presentation = () => (
  <Deck theme={theme} template={template}>
    <Slide>
      <FlexBox height='100%'>
        <img src={logo} alt='logo' height='70%' />
      </FlexBox>
      <Notes>
        Spectacle supports notes per slide.
        <ol>
          <li>Notes can now be HTML markup!</li>
          <li>Lists can make it easier to make points.</li>
        </ol>
      </Notes>
    </Slide>
    <Slide>
      <FlexBox height='100%' flexDirection='column'>
        <Heading margin='0px' fontSize='150px'>
          ✨<i>EMS</i> ✨
        </Heading>
        <Heading margin='0px' fontSize='h2' color='#fff'>
          APPLICATION FOR MANAGING THE EDUCATIONAL PROCESS
        </Heading>
      </FlexBox>
    </Slide>
    <Slide>
      <OrderedList>
        <FlexBox alignItems='flex-start'>
          <Appear>
            <Heading margin='0px'>🔥 Main technologies:</Heading>
            <OrderedList>
              <ol>
                <li>react;</li>
                <li>redux;</li>
                <li>firebase;</li>
                <li>Rest API.</li>
              </ol>
            </OrderedList>
          </Appear>
          <Appear>
            <Heading margin='0px'>🍓 Additional tools:</Heading>
            <ListItem>
              <ul>
                <li>axios;</li>
                <li>react-bootstrap;</li>
                <li>jest;</li>
                <li>redux-thunk;</li>
                <li>prop-types.</li>
              </ul>
            </ListItem>
          </Appear>
        </FlexBox>
      </OrderedList>
    </Slide>
    <Slide>
      <FlexBox height='100%' flexDirection='column'>
        <Heading margin='0px' fontSize='150px'>
          <i>How it works?</i>
        </Heading>
      </FlexBox>
    </Slide>
    <Slide>
      <Heading margin='0px' fontSize='150px'>
        <i>Roles</i>
      </Heading>
      <FlexBox flexDirection='column' alignItems='flex-start'>
        <Appear>
          <Text margin='0px' fontSize='50px' textAlign='left'>
            <b>Admin</b> - has access to all functionality;
          </Text>
        </Appear>
        <Appear margin='0px'>
          <Text margin='0px' fontSize='50px' textAlign='left'>
            <b>Mentor</b> - has access to all functions except deleting and editing users;
          </Text>
        </Appear>
        <Appear margin='0px'>
          <Text margin='0px' fontSize='50px' textAlign='left'>
            <b>User</b> - has access to own tasks and tracks.
          </Text>
        </Appear>
      </FlexBox>
    </Slide>
    <Slide>
      <Heading margin='0px' fontSize='100px'>
        <i>Available functionality</i>
      </Heading>
      <FlexBox flexDirection='column' alignItems='flex-start'>
        <Appear>
          <Text fontSize='50px' textAlign='left'>
            - add, remove, change, view users, tasks, tracks;
          </Text>
        </Appear>
        <Appear>
          <Text fontSize='50px' textAlign='left'>
            - change statuses for user tasks;
          </Text>
        </Appear>
        <Appear>
          <Text fontSize='50px' textAlign='left'>
            - assign tasks to users;
          </Text>
        </Appear>
        <Appear>
          <Text fontSize='50px' textAlign='left'>
            - view and mark progress.
          </Text>
        </Appear>
      </FlexBox>
    </Slide>
    <Slide>
      <Heading margin='0px' fontSize='100px'>
        <i>Additional functionality</i>
      </Heading>
      <FlexBox flexDirection='column' alignItems='flex-start'>
        <Appear>
          <Text fontSize='50px' textAlign='left'>
            - sing in with Google;
          </Text>
        </Appear>
        <Appear>
          <Text fontSize='50px' textAlign='left'>
            - form validation;
          </Text>
        </Appear>
        <Appear>
          <Text fontSize='50px' textAlign='left'>
            - 3 theme for UI;
          </Text>
        </Appear>
      </FlexBox>
    </Slide>
    <Slide>
      <Heading margin='0px' fontSize='100px'>
        <i>Separate routes</i>
      </Heading>
      <FlexBox justifyContent='space-around' alignItems='flex-start'>
        <Appear>
          <Heading margin='0px' fontSize='40px'>
            Mentor and Admin:
          </Heading>
          <OrderedList>
            <ol>
              <li>all users page;</li>
              <li>all tasks page;</li>
              <li>user task page;</li>
              <li>user progress page;</li>
              <li>about;</li>
              <li>settings;</li>
            </ol>
          </OrderedList>
        </Appear>
        <Appear>
          <Heading margin='0px' fontSize='40px'>
            User:
          </Heading>
          <OrderedList>
            <ol>
              <li>page of own tasks;</li>
              <li>page of own tracks;</li>
              <li>about;</li>
              <li>settings;</li>
            </ol>
          </OrderedList>
        </Appear>
      </FlexBox>
    </Slide>
    <Slide>
      <FlexBox height='100%' flexDirection='column'>
        <Heading margin='0px' fontSize='150px'>
          💡<i>Result</i> 💡
        </Heading>
        <Heading margin='0px' fontSize='h2' color='#fff'>
          You get an excellent tool for monitoring the implementation of tasks and managing the educational process.
        </Heading>
      </FlexBox>
    </Slide>
    <Slide>
      <FlexBox height='100%' flexDirection='column'>
        <Heading margin='0px' fontSize='150px'>
          😊<i>Thanks</i>
        </Heading>
      </FlexBox>
    </Slide>
  </Deck>
);
