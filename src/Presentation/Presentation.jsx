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
import logo from '../assets/img/education.png';

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
        <img src={logo} alt='logo' />
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
          <Text fontSize='50px' textAlign='left'>
            <b>Admin</b> - has access to all functionality;
          </Text>
        </Appear>
        <Appear>
          <Text fontSize='50px' textAlign='left'>
            <b>Mentor</b> - has access to members tasks and progress;
          </Text>
        </Appear>
        <Appear>
          <Text fontSize='50px' textAlign='left'>
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
      <FlexBox height='100%' flexDirection='column'>
        <Heading margin='0px' fontSize='150px'>
          😊<i>Thanks</i>
        </Heading>
      </FlexBox>
    </Slide>
  </Deck>
);
