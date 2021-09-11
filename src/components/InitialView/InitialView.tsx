import './InitialView.scss';

import { cn } from '@utils/cn';

export const InitialView = (props) => {
  const { className, children } = props;
  return <div {...cn('initial-view', className)}>{children}</div>;
};
