import { Box, Group, Title, Anchor, Flex } from '@mantine/core';
import { APP_METADATA } from '../../constants/messages';
import { NAVIGATION_ITEMS, ROUTES } from '../../constants/urls';
import { COMPONENT_PROPS } from '../../constants/ui';
import classes from './Header.module.scss';

export const Header = () => {
  return (
    <Box component={COMPONENT_PROPS.COMPONENT.HEADER} className={classes.header}>
      <Flex className={classes.container}>
        <Box className={classes.brand}>
          <Anchor 
            href={ROUTES.HOME} 
            underline={COMPONENT_PROPS.UNDERLINE.NEVER}
            className={classes.brand}
          >
            <Title order={1} className={classes.title}>
              {APP_METADATA.TITLE}
            </Title>
          </Anchor>
        </Box>

        <Group component={COMPONENT_PROPS.COMPONENT.NAV} className={classes.navigation}>
          {NAVIGATION_ITEMS.map((item) => (
            <Anchor 
              key={item.route}
              href={item.route} 
              className={`${classes.navLink} ${item.route === ROUTES.HOME ? classes.active : ''}`}
              underline={COMPONENT_PROPS.UNDERLINE.NEVER}
            >
              {item.label}
            </Anchor>
          ))}
        </Group>
      </Flex>
    </Box>
  );
};
