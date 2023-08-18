import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Seo } from '../../components/error/seo';
import { useNavigate } from 'react-router-dom';



const Page = () => {
  
  const navigate = useNavigate();
  // usePageView();

  return (
    <>
      {/* <Seo title="Error: Authorization Required" /> */}
      <Box
        component="main"
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexGrow: 1,
          py: '80px',
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mb: 6,
            }}
          >
            <Box
              alt="Not authorized"
              component="img"
              src="https://firebasestorage.googleapis.com/v0/b/car-service-bf62f.appspot.com/o/error-401.png?alt=media&token=dd98515a-6e3d-4de7-9987-9049f2c85dca"
              sx={{
                height: 'auto',
                maxWidth: '100%',
                width: 400,
              }}
            />
          </Box>
          <Typography
            align="center"
            variant={'h4'}
          >
            403: You do not have permission to access
          </Typography>
          <Typography
            align="center"
            color="text.secondary"
            sx={{ mt: 0.5 }}
          >
            You either tried some shady route or you came here by mistake. Whichever it is, try
            using the navigation.
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mt: 6,
            }}
          >
            <Button
              onClick={() => navigate('/login')}
            >
              Back to Home
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Page;
