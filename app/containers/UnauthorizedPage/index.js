/**
 * UnauthorizedPage
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
        status="403"
        title="403"
        subTitle="Sorry, you are not authorized to access this page."
        extra={<Link to={ROUTES.HOME}>Back Home</Link>}
      />
    </article>
  );
}
