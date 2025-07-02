import app from './app'
import { envConfig } from './config/env.config';

const PORT = envConfig.port || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
