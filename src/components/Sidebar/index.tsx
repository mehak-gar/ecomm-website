'use client';
import * as React from 'react';

import Drawer from '@mui/material/Drawer';

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/store';
import { getAllCategory, getCategory, updateCategoryUi } from '@/store/category';
import { useEffect } from 'react';
import { Box, Divider, List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material';
import { getSearch } from '@/store/search';

export default function SideBar({open}:{open:boolean}) {
    const dispatch=useDispatch<AppDispatch>()
const handleClose=()=>{
    dispatch(updateCategoryUi({opencategory:{open:false}}))
}
useEffect(()=>{
    dispatch(getAllCategory(10))

      },[dispatch])
const category=useSelector((state:any)=>state?.categories?.categories)
const handleClick=(data:any)=>{
  dispatch(getCategory(data))
  dispatch(updateCategoryUi({opencategory:{open:false}}))
}
  return (
    <>
 
      <Drawer open={open} onClose={()=>handleClose()}>
        <Typography variant='h6'>All Category</Typography>
      
      <Box sx={{ width: 250 }} role="presentation" >
      <List>
        {category?.map((data:any,i:any) => (
          <ListItem key={i} disablePadding>
            <ListItemButton onClick={()=>handleClick(data)}>
             
              <ListItemText primary={data} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
</Box>
        
      </Drawer>
    </>
  );
}
