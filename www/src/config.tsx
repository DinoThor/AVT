import React from 'react';
import { Icon } from '@rsuite/icons';
import { VscCalendar } from 'react-icons/vsc';
import { MdFingerprint, MdDashboard } from 'react-icons/md';
import CubesIcon from '@rsuite/icons/legacy/Cubes';

export const appNavs = [
  {
    eventKey: 'dashboard',
    icon: <Icon as={MdDashboard} />,
    title: 'Dashboard',
    to: '/dashboard'
  },
  {
    eventKey: 'calendar',
    icon: <Icon as={VscCalendar} />,
    title: 'Calendario',
    to: '/calendar'
  },
  {
    eventKey: 'authentication',
    title: 'Usuarios',
    icon: <Icon as={MdFingerprint} />,
    children: [
      {
        eventKey: 'sign-in',
        title: 'Cambiar de usuario',
        to: '/sign-in'
      },

      {
        eventKey: 'sign-up',
        title: 'Nuevo usuario',
        to: '/sign-up'
      },
      {
        eventKey: 'general-settings',
        title: 'Parámetros',
        to: '/general-settings'
      }
    ]
  },

  {
    eventKey: 'components',
    title: 'Etc...',
    icon: <CubesIcon />,
    href: '#',
    target: '_blank'
  }
];
