import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Grid, Box, Typography, Paper, useTheme, alpha } from '@mui/material';
import {
  PeopleAlt as PeopleAltIcon,
  SupportAgent as SupportAgentIcon,
  Visibility as VisibilityIcon,
  Description as DescriptionIcon,
  Collections as CollectionsIcon,
  HelpOutline as HelpOutlineIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  EmojiEvents as EmojiEventsIcon,
  Speed as SpeedIcon
} from '@mui/icons-material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

// animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5
    }
  }
};

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
  const theme = useTheme();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  const StatCard = ({ icon: Icon, title, count, trend, trendValue, color }) => (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      style={{ height: '100%' }}
    >
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2, sm: 3, md: 4 },
          height: '100%',
          minHeight: { xs: '180px', sm: '200px', md: '220px' },
          position: 'relative',
          overflow: 'hidden',
          borderRadius: 2,
          background: `linear-gradient(135deg, ${alpha(color, 0.1)} 0%, ${alpha(color, 0.05)} 100%)`,
          border: `1px solid ${alpha(color, 0.1)}`,
          '&:hover': {
            boxShadow: `0 8px 24px ${alpha(color, 0.15)}`,
          }
        }}
      >
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: { xs: 1, sm: 2 } }}>
            <Box
              sx={{
                width: { xs: 40, sm: 48, md: 56 },
                height: { xs: 40, sm: 48, md: 56 },
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: `linear-gradient(135deg, ${color} 0%, ${alpha(color, 0.8)} 100%)`,
                color: '#fff',
                mr: 2
              }}
            >
              <Icon sx={{ fontSize: { xs: 24, sm: 28, md: 32 } }} />
            </Box>
            <Box>
              <Typography 
                variant="h6" 
                color="textSecondary" 
                sx={{ 
                  mb: 0.5,
                  fontSize: { xs: '0.875rem', sm: '1rem', md: '1.25rem' }
                }}
              >
                {title}
              </Typography>
              <Typography 
                variant="h4" 
                sx={{ 
                  fontWeight: 'bold',
                  fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' }
                }}
              >
                {count}
              </Typography>
            </Box>
          </Box>
          {trend && (
            <Box sx={{ display: 'flex', alignItems: 'center', mt: { xs: 1, sm: 2 } }}>
              {trend === 'up' ? (
                <TrendingUpIcon sx={{ color: 'success.main', fontSize: { xs: 18, sm: 20, md: 24 }, mr: 0.5 }} />
              ) : (
                <TrendingDownIcon sx={{ color: 'error.main', fontSize: { xs: 18, sm: 20, md: 24 }, mr: 0.5 }} />
              )}
              <Typography
                variant="body2"
                color={trend === 'up' ? 'success.main' : 'error.main'}
                sx={{ 
                  fontWeight: 'medium',
                  fontSize: { xs: '0.75rem', sm: '0.875rem', md: '1rem' }
                }}
              >
                {trendValue}% {trend === 'up' ? 'increase' : 'decrease'}
              </Typography>
            </Box>
          )}
        </Box>
        <Box
          sx={{
            position: 'absolute',
            top: -20,
            right: -20,
            width: { xs: 80, sm: 100, md: 120 },
            height: { xs: 80, sm: 100, md: 120 },
            borderRadius: '50%',
            background: `linear-gradient(135deg, ${alpha(color, 0.1)} 0%, ${alpha(color, 0.05)} 100%)`,
            zIndex: 0
          }}
        />
      </Paper>
    </motion.div>
  );

  return (
    <Box sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
      {/* Welcome Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, sm: 4, md: 5 },
            mb: { xs: 3, sm: 4, md: 5 },
                position: 'relative',
                overflow: 'hidden',
            borderRadius: 2,
            background: 'linear-gradient(135deg, #1890ff 0%, #096dd9 100%)',
            color: '#fff',
            '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  bottom: 0,
              left: 0,
              background: 'linear-gradient(45deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%)',
              zIndex: 1
            }
          }}
        >
          <Box sx={{ position: 'relative', zIndex: 2 }}>
            <Typography 
              variant="h3" 
              sx={{ 
                mb: 1, 
                fontWeight: 'bold',
                fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' }
              }}
            >
              Welcome Back, Admin!
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                opacity: 0.8, 
                mb: 3,
                fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' }
              }}
            >
              Here's what's happening with your website today.
            </Typography>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: { xs: 1, sm: 2 },
              flexDirection: { xs: 'column', sm: 'row' }
            }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  background: 'rgba(255,255,255,0.1)',
                  borderRadius: 2,
                  p: { xs: 1.5, sm: 2 },
                  pr: { xs: 2, sm: 3 },
                  width: { xs: '100%', sm: 'auto' }
                }}
              >
                <EmojiEventsIcon sx={{ mr: 1, fontSize: { xs: 20, sm: 24 } }} />
                <Box>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    Total Visitors
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    2,543
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  background: 'rgba(255,255,255,0.1)',
                  borderRadius: 2,
                  p: { xs: 1.5, sm: 2 },
                  pr: { xs: 2, sm: 3 },
                  width: { xs: '100%', sm: 'auto' }
                }}
              >
                <SpeedIcon sx={{ mr: 1, fontSize: { xs: 20, sm: 24 } }} />
                <Box>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    Performance
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    98.5%
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box
                  sx={{
              position: 'absolute',
              top: -100,
              right: -100,
              width: { xs: 200, sm: 250, md: 300 },
              height: { xs: 200, sm: 250, md: 300 },
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.1)',
              zIndex: 1
            }}
          />
        </Paper>
              </motion.div>

      {/* Stats Grid - First Row */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Grid container spacing={gridSpacing} sx={{ mb: 3 }}>
          <Grid item xs={12} md={4}>
            <StatCard
              icon={PeopleAltIcon}
              title="Total Users"
              count="1,234"
              trend="up"
              trendValue="12"
              color={theme.palette.primary.main}
            />
            </Grid>
          <Grid item xs={12} md={4}>
            <StatCard
              icon={SupportAgentIcon}
                  title="Total Agents" 
              count="56"
                  trend="up"
              trendValue="8"
              color={theme.palette.success.main}
                />
            </Grid>
          <Grid item xs={12} md={4}>
            <StatCard
              icon={VisibilityIcon}
                  title="Total Visitors" 
              count="2,543"
                  trend="up"
              trendValue="15"
              color={theme.palette.info.main}
                />
          </Grid>
        </Grid>
      </motion.div>

      {/* Stats Grid - Second Row */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
          <Grid container spacing={gridSpacing}>
          <Grid item xs={12} md={4}>
            <StatCard
              icon={DescriptionIcon}
                  title="Total Pages" 
              count="89"
              trend="up"
              trendValue="5"
              color={theme.palette.warning.main}
            />
            </Grid>
          <Grid item xs={12} md={4}>
            <StatCard
              icon={CollectionsIcon}
                  title="Total Images" 
              count="1,567"
                  trend="up"
              trendValue="20"
              color={theme.palette.error.main}
                />
            </Grid>
          <Grid item xs={12} md={4}>
            <StatCard
              icon={HelpOutlineIcon}
              title="FAQ"
              count="45"
              trend="up"
              trendValue="3"
              color={theme.palette.secondary.main}
            />
        </Grid>
      </Grid>
    </motion.div>
    </Box>
  );
};

export default Dashboard;