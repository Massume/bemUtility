Function for generate bem classnames in react apps.

How to use

1. If use React

import bem from 'bem';

const b = bem('component-name');

const component = () => {
  return (
    <div className={b('')>  // classname will be 'component-name'
      <span className={b('title')}>title text</span> // classname will be 'component-name__title'
      <span className={b('title', { red: true })}>title text</span> // classname will be with modifaiers 'component-name__title component-name__title_red' 
      <span className={b('title', { mix: 'global-title' })}>title text</span> // classname will be 'component-name__title global-title'
    <div>
  )
}

2. If use NextJs with scss

import bem from 'bem';
import styles from './index.module.scss';

const b = bem('component-name', styles);

const component = () => {
  return (
    <div className={b('')>  // classname will be 'component-name'
      <span className={b('title')}>title text</span> // classname will be 'component-name__title'
      <span className={b('title', { red: true })}>title text</span> // classname will be with modifaiers 'component-name__title component-name__title_red' 
      <span className={b('title', { mix: 'global-title' })}>title text</span> // classname will be 'component-name__title global-title'
    <div>
  )
}
