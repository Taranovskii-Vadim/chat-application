import { Box } from '@mui/material';

interface Props {
  title: string;
  text: string;
  icon: IconType;
  onClose: () => void;
}

const FooterExtra = ({ icon, title, text, onClose }: Props): JSX.Element => (
  <Box sx={{}}></Box>
  // <div className="h-1/10 pl-4 pr-2 flex items-center border-t">
  //   <Icon type={icon} className="text-sky-500" />
  // <div className="ml-3">
  //   <h6 className="font-semibold text-sky-500 text-sm">{title}</h6>
  //   <p className="text-sm">{text}</p>
  // </div>
  // <IconButton className="ml-auto" onClick={onClose}>
  //   <Icon type="close" />
  // </IconButton>
  // </div>
);

export default FooterExtra;
