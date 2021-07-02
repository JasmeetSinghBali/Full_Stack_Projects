import {makeStyles} from '@material-ui/core/styles';

export default makeStyles({
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: '60vh',
    padding: '10%',
    borderRadius: 30,
    color: 'white',
  },
  infoCard: {
    display: 'flex', flexDirection: 'column', textAlign: 'center',
  },
  container: {
    padding: '0 5%', width: '100%', margin: 0,
  },
});
