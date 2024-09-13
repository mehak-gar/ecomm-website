'use client';


import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';

import MoreIcon from '@mui/icons-material/MoreVert';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { updateUi } from '@/store/Products';
import Cart from '../cart';
import { getAllCarts, getCartItemsCount, getCartTotal } from '@/store/cart';
import { useEffect, useState } from 'react';
import { clearSearch, getSearch } from '@/store/search';
import { updateCategoryUi } from '@/store/category';
import SideBar from '../Sidebar';
import { BASE_URL } from '@/utils/apiurl';
import AutocompleteHtml from '../common/Autocomplete.tsx';
import { SelectChangeEvent } from '@mui/material';
import UseAutocomplete from '../common/Autocomplete.tsx';


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function Navbar() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =useState<null | HTMLElement>(null);
    const [searchTerm, setSearchTerm] = useState("");
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleSearchTerm = (e:any) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
  }
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const dispatch=useDispatch<AppDispatch>()
      const ui = useSelector((state: RootState) => state.products.ui);


const categoryui=useSelector((state:RootState)=>state?.categories?.uis)
      const carts = useSelector(getAllCarts);
      useEffect(() => {
        dispatch(getCartTotal());

      }, [dispatch,carts])
      useEffect(()=>{
        dispatch(clearSearch());
   
      })
      const totalitems=useSelector(getCartItemsCount)
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
      <MenuItem  onClick={()=> dispatch(updateUi({ opencart: { open: true } }))}>
        
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={totalitems} color="error">
            <AddShoppingCartIcon />
          </Badge>
        </IconButton>
        <p>Cart</p>
      </MenuItem>

    </Menu>
  );
  const handlechange = (e: SelectChangeEvent) => {
    const selectedValue: any = e.target.value;
    // console.log(e, "selectedValue");
    if (selectedValue !== null && selectedValue !== undefined &&  typeof selectedValue === 'object') {
      dispatch(getSearch(selectedValue?.title));
    } 
    else
    {
      dispatch(getSearch(""));
    }
  };

  const product=useSelector((state:any)=>state?.products?.products)
  return (
    <>
    <Box sx={{ flexGrow: 1 }}>

      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={()=>dispatch(updateCategoryUi({opencategory:{open:true}}))}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
   Ecommerce website
          </Typography>


          <Search>
          <UseAutocomplete  options={product?.products} onChange={handlechange} valuekey={'title'} element={product} label={'Product Title'}/>
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
           
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
              onClick={()=> dispatch(updateUi({ opencart: { open: true } }))}
            >
              <Badge badgeContent={totalitems} color="error">
              <AddShoppingCartIcon/>
              </Badge>
            </IconButton>
          
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
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
      {renderMobileMenu}
   
      <Cart open={ui.opencart?.open} /> 
      <SideBar open={categoryui?.opencategory?.open}/>
    </Box>
    </>
  );
}


