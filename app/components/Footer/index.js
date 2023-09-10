import React from 'react';
import { FormattedHTMLMessage } from 'react-intl';
import LocaleToggle from 'containers/LocaleToggle';
import Wrapper from './Wrapper';
import messages from './messages';

function Footer() {
  return (
    <Wrapper>
      <section>
        <FormattedHTMLMessage {...messages.copyRightMessage} />
        <section>
          <FormattedHTMLMessage {...messages.copyRightSubMessage} />
        </section>
      </section>
      <section>
        <LocaleToggle />
      </section>
    </Wrapper>
  );
}

export default Footer;
