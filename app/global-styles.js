import { createGlobalStyle } from 'styled-components';
import {
  ROBOTO_BLACK_TTF,
  ROBOTO_BOLD_ITALIC_TTF,
} from './styles/fonts/Roboto';

import injectFontFaces from './styles/injectFontFaces';
const getFormattedURL = (name, format) => `url(${name}) format(${format})`;
const GlobalStyle = createGlobalStyle`
  ${injectFontFaces('Roboto', [
    getFormattedURL(ROBOTO_BLACK_TTF, 'ttf'),
    getFormattedURL(ROBOTO_BOLD_ITALIC_TTF, 'ttf'),
  ])}
  body {
    height: 100%;
    width: 100%;
  }
  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }
  body.fontLoaded {
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }
  #app {
    min-height: 100%;
    min-width: 100%;
  }
  svg {
    vertical-align: baseline;
  }
  .ant-modal-header, .ant-modal-content, .ant-modal-title {
    background-color: rgb(32,33,35);
    color: white;
    font-size: 1.2rem;
  }
  .ant-modal-content {
    border-radius: 0.5rem 0.5rem 0.5rem 0.5rem;
  }
  .ant-modal-header {
    border: 0px solid transparent;
    border-bottom: 1px solid hsla(0,0%,100%,.1);
    border-radius: 0.5rem 0.5rem 0rem 0rem;
    padding: 25px;
  }
  .ant-modal-body {
    font-size: 1rem;
  }
  .ant-modal-footer {
    border: none;
    padding: 0px 24px 24px 24px;
  }
  .ant-modal-footer .ant-btn-default {
    border: none;
    background-color: rgb(52,53,65);
    border-color: rgb(86,88,105);
    color: rgb(217,217,227);
  }
  .ant-modal-footer .ant-btn-primary {
    border: none;
    background-color: rgb(185,28,28);
    color: rgb(255,255,255);
  }
  .ant-modal-mask {
    background-color: rgba(86,88,105,.7);
  }
  .ant-modal-close-x {
    display: none;
  }
  span.ant-menu-title-content {
    max-width: 150px;
  }
  .ant-dropdown-menu {
    margin-right: 16px;
  }
  .ant-upload-list-picture-card .ant-upload-list-item, .ant-upload.ant-upload-select-picture-card > .ant-upload {
    background: #10615e;
    color: white;
  }
  /**
  * display utility class
  */
  .u-d-block{
  display: block;
  }
  .u-d-flex{
  display: flex;
  }
  .u-d-inline{
  display: inline;
  }
  .u-d-inline-block{
  display: inline-block;
  }
  .u-d-inline-flex{
  display: inline-flex;
  }
  .u-d-none{
  display: none;
  }
  .u-d-table{
  display: table;
  }
  .u-d-table-cell{
  display: table-cell;
  }
  /**
  * Utility classes for flex-box 
  */
  .u-flex-column {
  flex-direction: column;
  }
  .u-flex-column-reverse {
  flex-direction: column-reverse;
  }
  .u-flex-row {
  flex-direction: row;
  }
  .u-flex-row-reverse {
  flex-direction: row-reverse;
  }
  .u-flex-nowrap {
  flex-wrap: nowrap;
  }
  .u-flex-wrap {
  flex-wrap: wrap;
  }
  .u-flex-wrap-reverse {
  flex-wrap: wrap-reverse;
  }
  .u-flex-fill {
  flex: 1 1 auto;
  }
  .u-flex-grow-1 {
  flex-grow: 1;
  }
  .u-flex-grow-0 {
  flex-grow: 0;
  }
  .u-flex-shrink-1 {
  flex-grow: 1;
  }
  .u-flex-shrink-0 {
  flex-grow: 0;
  }
  .u-justify-content-start {
  justify-content: flex-start;
  }
  .u-justify-content-end {
  justify-content: flex-end;
  }
  .u-justify-content-center {
  justify-content: center;
  }
  .u-justify-content-between {
  justify-content: space-between;
  }
  .u-justify-content-around {
  justify-content: space-around;
  }
  .u-align-content-start {
  align-content: flex-start;
  }
  .u-align-content-end {
  align-content: flex-end;
  }
  .u-align-content-stretch {
  align-content: stretch;
  }
  .u-align-content-center {
  align-content: center;
  }
  .u-align-content-around {
  align-content: space-around;
  }
  .u-align-items-start {
  align-items: flex-start;
  }
  .u-align-items-end {
  align-items: flex-end;
  }
  .u-align-items-baseline {
  align-items: baseline;
  }
  .u-align-items-center {
  align-items: center;
  }
  .u-align-items-stretch {
  align-items: stretch;
  }
  .u-align-self-start {
  align-self: flex-start;
  }
  .u-align-self-end {
  align-self: flex-end;
  }
  .u-align-self-center {
  align-self: center;
  }
  .u-align-self-stretch {
  align-self: stretch;
  }
  .u-align-self-baseline {
  align-self: baseline;
  }
  /*
  * spacing utility class
  */
  // margin 
  .u-m-1{
  margin: @margin-xss;
  }
  .u-m-2{
  margin: @margin-xs;
  }
  .u-m-3{
  margin: @margin-sm;
  }
  .u-m-4{
  margin: @margin-md;
  }
  .u-m-5{
  margin: @margin-lg;
  }
  // margin top
  .u-mt-0 {
    margin-top: 0 !important;
  }
  .u-mt-1{
  margin-top: @margin-xss;
  }
  .u-mt-2{
  margin-top: @margin-xs;
  }
  .u-mt-3{
  margin-top: @margin-sm;
  }
  .u-mt-4{
  margin-top: @margin-md;
  }
  .u-mt-5{
  margin-top: @margin-lg;
  }
  // margin bottom
  .u-mb-1{
  margin-bottom: @margin-xss;
  }
  .u-mb-2{
  margin-bottom: @margin-xs;
  }
  .u-mb-3{
  margin-bottom: @margin-sm;
  }
  .u-mb-4{
  margin-bottom: @margin-md;
  }
  .u-mb-5{
  margin-bottom: @margin-lg;
  }
  // margin right
  .u-mr-1{
  margin-right: @margin-xss;
  }
  .u-mr-2{
  margin-right: @margin-xs;
  }
  .u-mr-3{
  margin-right: @margin-sm;
  }
  .u-mr-4{
  margin-right: @margin-md;
  }
  .u-mr-5{
  margin-right: @margin-lg;
  }
  // margin left
  .u-ml-1{
  margin-left: @margin-xss;
  }
  .u-ml-2{
  margin-left: @margin-xs;
  }
  .u-ml-3{
  margin-left: @margin-sm;
  }
  .u-ml-4{
  margin-left: @margin-md;
  }
  .u-ml-5{
  margin-left: @margin-lg;
  }
  // padding
  .u-p-1{
  padding: @padding-xss;
  }
  .u-p-2{
  padding: @padding-xs;
  }
  .u-p-3{
  padding: @padding-sm;
  }
  .u-p-4{
  padding: @padding-md;
  }
  .u-p-5{
  padding: @padding-lg;
  }
  // padding top
  .u-pt-1{
  padding-top: @padding-xss;
  }
  .u-pt-2{
  padding-top: @padding-xs;
  }
  .u-pt-3{
  padding-top: @padding-sm;
  }
  .u-pt-4{
  padding-top: @padding-md;
  }
  .u-pt-5{
  padding-top: @padding-lg;
  }
  // padding bottom
  .u-pb-1{
  padding-bottom: @padding-xss;
  }
  .u-pb-2{
  padding-bottom: @padding-xs;
  }
  .u-pb-3{
  padding-bottom: @padding-sm;
  }
  .u-pb-4{
  padding-bottom: @padding-md;
  }
  .u-pb-5{
  padding-bottom: @padding-lg;
  }
  // padding right
  .u-pr-1{
  padding-right: @padding-xss;
  }
  .u-pr-2{
  padding-right: @padding-xs;
  }
  .u-pr-3{
  padding-right: @padding-sm;
  }
  .u-pr-4{
  padding-right: @padding-md;
  }
  .u-pr-5{
  padding-right: @padding-lg;
  }
  // padding left
  .u-pl-1{
  padding-left: @padding-xss;
  }
  .u-pl-2{
  padding-left: @padding-xs;
  }
  .u-pl-3{
  padding-left: @padding-sm;
  }
  .u-pl-4{
  padding-left: @padding-md;
  }
  .u-pl-5{
  padding-left: @padding-lg;
  }
  /*
  * sizing utility class
  */
  // width
  .u-w-25 {
  width: 25%;
  }
  .u-w-50 {
  width: 50%;
  }
  .u-w-75 {
  width: 75%;
  }
  .u-w-100 {
  width: 100%;
  }
  .u-mw-100 {
  max-width: 100%;
  }
  // height
  .u-h-25 {
  height: 25%;
  }
  .u-h-50 {
  height: 50%;
  }
  .u-h-75 {
  height: 75%;
  }
  .u-h-100 {
  height: 100%;
  }
  .u-mh-100 {
  max-height: 100%;
  }
  /*
  * colors utility class
  */
  //background
  .u-bg-primary {
  background-color: @primary-color;
  }
  .u-bg-secondary {
  background-color: @secondary-color;
  }
  .u-bg-success {
  background-color: @success-color;
  }
  .u-bg-info {
  background-color: @processing-color;
  }
  .u-bg-warning {
  background-color: @warning-color;
  }
  .u-bg-danger {
  background-color: @error-color;
  }
  .u-bg-light {
  background-color: @background-color-light ;
  }
  .u-bg-dark {
  background-color: @black;
  }
  .u-bg-white {
  background-color: @white;
  }
  //text
  .u-text-primary {
  color: @text-color;
  }
  .u-text-secondary {
  color: @text-color-primary;
  }
  .u-text-success {
  color: @success-color;
  }
  .u-text-info {
  color: @processing-color;
  }
  .u-text-warning {
  color: @warning-color;
  }
  .u-text-danger {
  color: @error-color;
  }
  .u-text-light {
  color: @background-color-light ;
  }
  .u-text-dark {
  color: @text-color-dark;
  }
  .u-text-white {
  color: @text-color-inverse;
  }
  /*
  * Text utility class
  */
  // font-weight
  .u-font-weight-bold {
  font-weight: bold;
  } 
  .u-font-weight-bolder {
  font-weight: bolder;
  } 
  .u-font-weight-light {
  font-weight: light;
  } 
  .u-font-weight-lighter {
  font-weight: lighter;
  } 
  .u-font-weight-normal {
  font-weight: normal;
  } 
  // text-decoration
  .u-text-decoration-none {
  text-decoration: none; 
  }
  // font-style
  .u-font-style-italic {
  font-style: italic;
  }
  .u-font-size-base {
    font-size : @font-size-base;
  }
  .u-font-size-sm {
    font-size : @font-size-sm;
  }
  .u-font-size-lg {
    font-size : @font-size-lg;
  }
  .u-font-size-xlg {
    font-size: @font-size-sm * 2 !important;
  }
  // text-monospace 
  .u-text-monospace {
    font-family: SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace !important;
  }
  // text style
  .u-text-justify {
  text-align: justify !important;
  }
  .u-text-center {
  text-align: center !important;
  }
  .u-text-nowrap {
  white-space: nowrap !important;
  }
  .u-text-right {
  text-align: right !important;
  }
  .u-text-lowercase {
  text-transform: lowercase !important;
  }
  .u-text-uppercase {
  text-transform: uppercase !important;
  }
  .u-text-capitalize {
  text-transform: capitalize !important;
  }
  .u-text-truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  }
  .u-text-muted {
  color: @disabled-color !important;
  }
  .u-text-break {
  word-break: break-word !important;
  overflow-wrap: break-word !important;
  }
.ant-carousel .slick-next::before {
  content: '';
border-left: 10px solid #000000;
border-top: 10px solid transparent;
border-bottom: 10px solid transparent;
opacity: 0.2 !important; 
margin-left: -50px
}
.ant-carousel .slick-prev,.ant-carousel .slick-next {
  z-index:1;
}
.ant-carousel .slick-prev::before {
  content: '';
border-right: 10px solid #000000;
border-top: 10px solid transparent;
border-bottom: 10px solid transparent;
opacity: 0.2 !important; 
margin-left: 30px
}
.lh-6 {
  line-height: 6px !important;
}
.btn-hover-none:hover {
  background: none !important;
}
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-track {
  border-radius: 5px;
}
::-webkit-scrollbar-thumb {
  background: #B8B8B8; 
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
  background: #D0D0D0; 
}
.p-4 {
  padding: 4px !important;
}
.notificationPopoverContainer {
  .ant-empty {
    margin: 20px;
  }
  .ant-popover-content {
    max-height: 400px;
    min-width: 300px;
    max-width: 300px;
    overflow: hidden;
    border: 2px solid @primary-color;
  }
  .ant-popover-title {
    background: @primary-color;
    color: @white;
    padding: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    p {
      margin-bottom: 0;
      font-size: 20px;
    }
    svg {
      font-size: 18px;
      cursor: pointer;
    }
  }
  .notificationCount .ant-badge-count {
    font-size: 2px;
    padding: 10px;
    background-color: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .ant-popover-inner-content {
    padding: 0;
  }
  .ant-list {
    max-height: 300px;
    overflow: auto;
    .readNotifications {
      font-weight: bold; 
    }
  }
  .ant-list-item {
    overflow: hidden;
    align-items: center;
    justify-content: flex-start;
    padding: 20px 8px 20px 12px;
    word-break: break-word;
    font-size: 15px;
    cursor: pointer;
    p {
      margin-bottom: 0;
    }
    .notificationIcon {
      margin-left: 20px;
      margin-right: 30px;
      font-size: 15px;
      img {
        height: 18px;
        width: 18px;
      }
    }
  }
  .newNotificationsLoader {
    padding: 20px 12px;
    margin-left: 20px;
  }
  .sideContainer {
    max-width: 513px;
    width: 100%;
  }
}
`;

export default GlobalStyle;
