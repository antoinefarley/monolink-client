import './InitialView.scss';

import { cn } from '@utils/cn';

export const InitialView = (props) => {
  const { className, children, useLoading } = props;
  return (
    <div {...cn('initial-view', className, useLoading && 'loading')}>
      {useLoading ? null : children}
    </div>
  );
};
