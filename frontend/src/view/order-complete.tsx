import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from 'components/Container';
import { useNavigate } from 'react-router-dom';

export const OrderCompleteView = (): JSX.Element => {
  const navigate = useNavigate();
  return (
    <Container maxWidth={600}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box
          component={'svg'}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          width={130}
          height={130}
          color={'success.light'}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
          />
        </Box>
        <Typography
          variant={'h4'}
          fontWeight={700}
          align={'center'}
          marginY={2}
        >
          Your order is completed!
        </Typography>
        <Typography
          fontWeight={400}
          color={'text.secondary'}
          align={'center'}
        >
          Thank you for your order!
          <br />
          Your order is being processed and will be completed within 3-6
          hours.
          <br />
          You will receive an email confirmation when your order is completed.
        </Typography>
        <Button
          variant={'contained'}
          size={'large'}
          sx={{ marginTop: 4 }}
          onClick={() => {
            navigate("/shop");
          }}
        >
          Continue shopping
        </Button>
      </Box>
    </Container>



  );
};

