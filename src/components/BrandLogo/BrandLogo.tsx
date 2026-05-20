import { SvgIcon, SvgIconProps } from '@mui/material';
import React from 'react';

const BrandLogo = (props: SvgIconProps): JSX.Element => {
  return (
    <SvgIcon data-testid="brand_logo" viewBox="0 0 256 256" {...props}>
      <polygon fill="#FF4438" points="0 148.416529 101.656432 172.852893 120.245643 255.153719" />
      <polygon fill="#F8BBA7" points="61.5037344 0 0 148.416529 101.656432 172.852893" />
      <polygon
        fill="#ED6A54"
        points="92.5211618 133.289256 101.656432 172.852893 255.575104 172.852893"
      />
      <polygon
        fill="#B21D18"
        points="101.656432 172.852893 120.245643 255.153719 255.575104 172.852893"
      />
    </SvgIcon>
  );
};

export default BrandLogo;
