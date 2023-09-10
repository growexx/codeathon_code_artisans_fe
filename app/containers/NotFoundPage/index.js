/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { Result } from 'antd';
import { ROUTES } from '../constants';

export default function NotFound() {
  return (
    <article>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={<Link to={ROUTES.HOME}>Back Home</Link>}
      />
    </article>
  );
}
