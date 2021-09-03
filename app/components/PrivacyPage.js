/**
 *
 * HeroPage
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { Col, Card, Row, Typography } from 'antd';
import styled from 'styled-components';
import { useMediaQuery } from 'react-responsive';

const { Title, Text } = Typography;

const StyledTextColumn = styled(Col)`
  &&& {
    text-align: left;
    display: flex !important;
    justify-content: center;
    flex-direction: column;
}
  }
`;

const StyledTextColumnLeft = styled(StyledTextColumn)`
  padding-left: 2em;
  padding-right: 2em;
`;

const TextBodyStyle = styled(Text)`
  font-size: 1.5em;
`;

const RowCenter = styled(Row)`
  display: flex;
  justify-content: center;
`;

const CardShadow = styled(Card)`
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);

  &:hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }
  white-space: pre-line;
  &&& {
    border-radius: 2%;
  }
`;

function PrivacyPage() {
  const isMobile = useMediaQuery({ query: `(max-width: 768px)` });

  return (
    <div>
      <Card bordered={false}>
        <RowCenter>
          <StyledTextColumnLeft
            style={isMobile ? { padding: '0' } : {}}
            xs={24}
            sm={24}
            md={24}
            lg={24}
          >
            <br />
            <CardShadow>
              <Title
                style={{
                  color: '#5222D0',
                  fontSize: '3em',
                  fontWeight: 'bold',
                }}
              >
                PRIVACY POLICY
              </Title>
              <TextBodyStyle>
                {`This Privacy Policy explains how Dactic Technologies (“Dactic,” “we,” or “us”) collects, uses, and discloses information about you. This Privacy Policy applies when you use our websites, mobile applications, and other online products and services that link to this Privacy Policy (collectively, our “Services”), contact our customer service team, engage with us on social media, or otherwise interact with us.
We may change this Privacy Policy from time to time. If we make changes, we will notify you by revising the date at the top of this policy and, in some cases, we may provide you with additional notice (such as adding a statement to our website or providing you with a notification). We encourage you to review this Privacy Policy regularly to stay informed about our information practices and the choices available to you.
CONTENTS
Collection of Information
Use of Information
Sharing of Information
Third-Party Embeds
Contact Us
COLLECTION OF INFORMATION
Information You Provide to Us
We collect information you provide directly to us. For example, you share information directly with us when you create an account, fill out a form, submit or post content through our Services, purchase a membership, communicate with us via third-party platforms, request customer support, or otherwise communicate with us. The types of personal information we may collect include your name, display name, username, bio, email address, business information, your content, including your avatar image, photos, posts, responses, and series published by you, and any other information you choose to provide.
We do not collect payment information through our Services. We rely on third parties to process payments in connection with our Services. Any information you provide to facilitate such a payment is subject to the third-party payment processor’s privacy policy, and we encourage you to review this policy before you provide any information to the payment processor.
Information We Collect Automatically When You Interact with Us
In some instances, we automatically collect certain information, including:
Activity Information: We collect information about your activity on our Services, such as your reading history and when you share links, follow users, highlight posts, and clap for posts.
Transactional Information: When you purchase a membership, we collect information about the transaction, such as subscription details, purchase price, and the date of the transaction.
Device and Usage Information: We collect information about how you access our Services, including data about the device and network you use, such as your hardware model, operating system version, mobile network, IP address, unique device identifiers, browser type, and app version. We also collect information about your activity on our Services, such as access times, pages viewed, links clicked, and the page you visited before navigating to our Services.
Information Collected by Cookies and Similar Tracking Technologies: We use tracking technologies, such as cookies and web beacons, to collect information about you. Cookies are small data files stored on your hard drive or in device memory that help us improve our Services and your experience, see which areas and features of our Services are popular, and count visits. Web beacons (also known as “pixel tags” or “clear GIFs”) are electronic images that we use on our Services and in our emails to help deliver cookies, count visits, and understand usage. We also work with third party analytics providers who use cookies, web beacons, device identifiers, and other technologies to collect information about your use of our Services and other websites and applications, including your IP address, web browser, mobile network information, pages viewed, time spent on pages or in mobile apps, and links clicked. This information may be used by Dactic and others to, among other things, analyze and track data, determine the popularity of certain content, deliver content targeted to your interests on our Services, and better understand your online activity. For more information about cookies and how to disable them, see Your Choices below.
Information We Collect from Other Sources
We obtain information from third-party sources. For example, we may collect information about you from social networks, accounting services providers and data analytics providers. Additionally, if you create or log into your Dactic account through a third-party platform (such as Apple, Facebook, Google, or Twitter), we will have access to certain information from that platform, such as your name, lists of friends or followers, birthday, and profile picture, in accordance with the authorization procedures determined by such platform.
Information We Derive
We may derive information or draw inferences about you based on the information we collect. For example, we may make inferences about your location based on your IP address or infer reading preferences based on your reading history.
USE OF INFORMATION
We use the information we collect to provide, maintain, and improve our Services, which includes publishing and distributing user-generated content, personalizing the posts you see and operating our metered paywall. We also use the information we collect to:
Create and maintain your Dactic account;
Process transactions and send related information, such as confirmations, receipts, and user experience surveys;
Send you technical notices, security alerts, and support and administrative messages;
Respond to your comments and questions and provide customer service;
Communicate with you about new content, products, services, and features offered by Dactic and provide other news and information we think will interest you (see Your Choices below for information about how to opt out of these communications at any time);
Monitor and analyze trends, usage, and activities in connection with our Services;
Detect, investigate, and prevent security incidents and other malicious, deceptive, fraudulent, or illegal activity and protect the rights and property of Dactic and others;
Debug to identify and repair errors in our Services;
Comply with our legal and financial obligations; and
Carry out any other purpose described to you at the time the information was collected.
SHARING OF INFORMATION
We share personal information in the following circumstances or as otherwise described in this policy:
We share personal information with other users of the Services. For example, if you use our Services to publish content, post comments or send private notes, certain information about you will be visible to others, such as your name, photo, bio, other account information you may provide, and information about your activities on our Services (e.g., your followers and who you follow, recent posts, claps, highlights, and responses).
We share personal information with vendors, service providers, and consultants that need access to personal information in order to perform services for us, such as companies that assist us with web hosting, storage, and other infrastructure, analytics, payment processing, fraud prevention and security, customer service, communications, and marketing.
We may disclose personal information if we believe that disclosure is in accordance with, or required by, any applicable law or legal process, including lawful requests by public authorities to meet national security or law enforcement requirements. If we are going to disclose your personal information in response to legal process, we will give you notice so you can challenge it (for example by seeking court intervention), unless we are prohibited by law or believe doing so may endanger others or cause illegal conduct. We will object to legal requests for information about users of our Services that we believe are improper.
We may share personal information if we believe that your actions are inconsistent with our user agreements or policies, if we believe that you have violated the law, or if we believe it is necessary to protect the rights, property, and safety of Dactic, our users, the public, or others.
We share personal information with our lawyers and other professional advisors where necessary to obtain advice or otherwise protect and manage our business interests.
We may share personal information in connection with, or during negotiations concerning, any merger, sale of company assets, financing, or acquisition of all or a portion of our business by another company.
Personal information is shared between and among Dactic and our current and future parents, affiliates, and subsidiaries and other companies under common control and ownership.
We share personal information with your consent or at your direction.
We also share aggregated or de-identified information that cannot reasonably be used to identify you.
THIRD-PARTY EMBEDS
Dactic does not host some of the content displayed on our Services. Users have the ability to post content that is actually hosted by a third party, but is embedded in our pages (an “Embed”). When you interact with an Embed, it can send information about your interaction to the hosting third party just as if you were visiting the third party’s site directly. For example, when you load a Dactic post page with a YouTube video Embed and watch the video, YouTube receives information about your activity, such as your IP address and how much of the video you watch. Dactic does not control what information third parties collect through Embeds or what they do with the information. This Privacy Policy does not apply to information collected through Embeds. The privacy policy belonging to the third party hosting the Embed applies to any information the Embed collects, and we recommend you review that policy before interacting with the Embed.
`}
              </TextBodyStyle>
              <br />
              <br />
            </CardShadow>

            <br />
            <br />
          </StyledTextColumnLeft>
        </RowCenter>
      </Card>
    </div>
  );
}

PrivacyPage.propTypes = {};

export default PrivacyPage;
