import urlApiStr from './urlApiStr';

const urlFilesApiStr = (data = {}) => urlApiStr(`${process.env.URL_API_FILES}/file`, data);

export default urlFilesApiStr;