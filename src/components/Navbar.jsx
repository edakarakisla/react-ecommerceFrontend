import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MoreIcon from '@mui/icons-material/MoreVert';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Avatar, Button } from '@mui/material';
import { userLogout } from '../store/features/userSlice';

export default function Navbar() {
  const { value } = useSelector(state => state.cart);
  const { isUser, username } = useSelector(state => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleLogout = () => {
    dispatch(userLogout());
    handleMenuClose();
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem   sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
        <IconButton
          size="large"
          aria-label="show new carts"
          color="inherit"
          onClick={() => navigate("/cart-detail")}
        >
          <Badge badgeContent={value} color="error" >
            <ShoppingCartOutlinedIcon />
          </Badge>
    </IconButton>
       
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        {!isUser ?
          <Button size='small' color='inherit' variant='outlined' className="border-[#B0BEC5]">
            <Link to={"/login"} className="no-underline text-[#B0BEC5]">Sign In</Link>
          </Button> :
          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-controls={menuId}
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
            className="ml-2"
          >
            <Avatar className="bg-[#B0BEC5]">{username.charAt(0).toUpperCase()}</Avatar>
          </IconButton>
        }
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          backgroundColor: 'rgba(0, 0, 0, 0.9)', 
          color: '#FFFFFF',
          backdropFilter: 'blur(8px)',
        }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            className="flex-grow hidden sm:block font-mono"
          >
            <Link to={"/"} className="text-white no-underline">Basic</Link>
          </Typography>
          <Box className="flex-grow" />
          <Box className="hidden md:flex items-center">
            <IconButton
              size="large"
              aria-label="show new carts"
              color="inherit"
              onClick={() => navigate("/cart-detail")}
            >
              <Badge badgeContent={value} color="error">
                <ShoppingCartOutlinedIcon />
              </Badge>
            </IconButton>
            {!isUser ?
              <Button size='small' color='inherit' variant='outlined' className="border-[#B0BEC5] ml-2">
                <Link to={"/login"} className="no-underline text-[#B0BEC5]">Sign In</Link>
              </Button> :
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
                className="ml-2"
              >
                <Avatar className="bg-[#B0BEC5]">{username.charAt(0).toUpperCase()}</Avatar>
              </IconButton>
            }
          </Box>
          <Box className="flex md:hidden">
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {/* Banner */}
      <Box
        className="w-full bg-[#FFB74D] text-white p-2 text-center relative overflow-hidden"
        style={{ marginTop: '0px' }} // Remove the gap between Navbar and Banner
      >
        <Box
          className="inline-block whitespace-nowrap animate-banner-slide"
          style={{ fontFamily: 'Roboto, sans-serif' }}
        >
          <Typography variant="subtitle1" component="span" className="block">
            Welcome to Basic! Explore our latest products and offers. Enjoy shopping with us!
          </Typography>
        </Box>
      </Box>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
