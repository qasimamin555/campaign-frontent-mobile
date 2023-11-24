import React          from 'react';
import { Appbar }     from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { Color }      from '../../assets/themeColor';

function CustomHeader(props) {
  const { navigation, title, rightIcons, callback } = props;

  return (
    <React.Fragment>
      <Appbar.Header style={ styles.header }>
        <Appbar.BackAction onPress={ () => navigation.goBack() } color={ "#fff" }/>
        <Appbar.Content style={ { alignItems: 'flex-start' } } color={ "#fff" } title={ title }/>
        { rightIcons
          && rightIcons.length > 0
          && rightIcons.map(({ icon }, key) =>
            <Appbar.Action key={ key } onPress={ () => callback(icon) } color={ "#fff" } icon={ icon }/>)
        }
      </Appbar.Header>
    </React.Fragment>
  );
}


const styles = StyleSheet.create({
  header: {
    backgroundColor: Color,
  },
})
export default CustomHeader;
