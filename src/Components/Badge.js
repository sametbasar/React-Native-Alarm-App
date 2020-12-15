import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Theme} from '../../contants';

const Badge = (props) => {
  const {badge} = props;
  let background, text;
  switch (badge) {
    case 'aile üyesi':
      background = styles.primary;
      text = styles.primaryText;
      break;
    case 'kişiler listesinde':
      background = styles.danger;
      text = styles.dangerText;
      break;
    case 'acil durum':
      background = styles.blue;
      text = styles.blueText;
      break;
    case 'onay bekliyor':
      background = styles.gray;
      text = styles.grayText;
      break;
  }

  const badgeStyles = [styles.badge, background];
  const badgeTextStyles = [styles.badgeText, text];
  return (
    <View style={badgeStyles}>
      <Text style={badgeTextStyles}>{badge}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight: 10,
    borderRadius: 15,
  },
  badgeText: {
    fontSize: Theme.sizes.caption,
    fontFamily: Theme.fonts.bold,
  },
  primary: {
    backgroundColor: '#ffebcb',
  },
  primaryText: {
    color: Theme.colors.primary,
  },
  danger: {
    backgroundColor: '#fbe8ef',
  },
  dangerText: {
    color: Theme.colors.danger,
  },
  gray: {
    backgroundColor: '#f1f2f3',
  },
  grayText: {
    color: Theme.colors.gray,
  },
  blue: {
    backgroundColor: Theme.colors.secondary,
  },
  blueText: {
    color: Theme.colors.white,
  },
});

export default Badge;
