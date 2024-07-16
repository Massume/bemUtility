Function for generate bem classnames in react apps.

How to use

1. If use React



import bem from 'bem';

const b = bem('component-name');

// classname will be 'component-name'<br />
// <div className={b('') /> 
<br />
<br />
// classname will be 'component-name__title'<br />
// <span className={b('title')}>title text</span>
<br />
<br />
// classname will be with modifaiers 'component-name__title component-name__title_red' 
<br />
// <span className={b('title', { red: true })}>title text</span> 
<br />
<br />
// classname will be 'component-name__title global-title'
 <br />
// <span className={b('title', { mix: 'global-title' })}>title text</span> 
<br />
<br />
<br />
2. If use NextJs with scss

import bem from 'bem';
import styles from './index.module.scss';

const b = bem('component-name', styles);
