import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Avatar, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';

import { api } from '../../api';
import getChats from '../../api/getChats';

import { stringAvatar } from './helpers';

// TODO include store library maybe redux toolkit or just redux with sagas
const Sidebar = (): JSX.Element => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await api(getChats, undefined, 1);

      setData(response);
    };

    fetchData();
  }, []);

  return (
    <Grid item xs={2.5} sx={{ borderRight: `1px solid ${grey['300']}` }}>
      {data.map(({ id }) => (
        <Grid
          container
          key={id}
          onClick={() => navigate(`/${id}`)}
          sx={{ p: 2, cursor: 'pointer', maxHeight: '72px', alignItems: 'center' }}
        >
          <Grid item xs={3}>
            <Avatar {...stringAvatar('Тарановский Вадим')} />
          </Grid>
          <Grid item xs={9}>
            <Typography variant="h3">{id}</Typography>
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
};

export default Sidebar;
