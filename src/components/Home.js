import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Button,
  Paper,
  Grid,
} from '@mui/material';

const Home = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md">
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        mt={8}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            borderRadius: 2,
          }}
        >
          <Typography variant="h3" gutterBottom>
            Добро пожаловать в приложение для анализа доходов и расходов
          </Typography>
          <Typography variant="h6" paragraph>
            Отслеживайте свои доходы и расходы без особых усилий. Проанализируйте свою финансовую
            ситуацию и оставайтесь на вершине своих целей.
          </Typography>
          <Grid container spacing={2} justifyContent="center">
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={() => navigate('/login')}
              >
                Войти
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                color="primary"
                size="large"
                onClick={() => navigate('/register')}
              >
                Зарегистрироваться
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Container>
  );
};

export default Home;
