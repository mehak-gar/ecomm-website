/* eslint-disable @next/next/no-img-element */
'use client';
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Box, IconButton, InputAdornment } from '@mui/material';
import SearchIcon from "@mui/icons-material/Search";
import exp from 'constants';
type SelectInfiniteProps =
  | {

     onChange: any;

     anyMenuItem?: boolean;
     valuekey:any
    options:any
    element:any
    label:any
  
  }
const UseAutocomplete: React.FC<SelectInfiniteProps>=({ options,onChange ,anyMenuItem,valuekey,element,label})=> {
  const lastElementRef = useRef<any>(null);
  const [value, setValue] =useState<string | null>('');
  const [inputValue, setInputValue] = useState('');
  const [limit, setLimit] = useState(30);
  const [localAllEvents, setLocalAllEvents] = useState<any[]>([]);
  // const [search, setSearch] = useState("");
  // const [pageNumber, setPageNumber] = useState(1);
  // const [searchText, setSearchText] = useState("");
  // useEffect(() => {
  //   setPageNumber(1);
  // }, [search]);
  //  // Function to handle scroll Event
   const handleScroll = useCallback(() => {
    if (lastElementRef.current) {
      const { scrollHeight, clientHeight, scrollTop } = lastElementRef.current;
      const isAtBottom = scrollTop + clientHeight + 1 > scrollHeight;

      if (isAtBottom) {
        if (element.limit !== null) {
          setLimit((prevLimit) => prevLimit + 30);
        }
      }
    }
  }, [element.limit, element.products]);
  useEffect(() => {
    const lastElement = lastElementRef.current;
    if (lastElement) {
      lastElement.addEventListener("scroll", handleScroll);

      return () => {
        lastElement.removeEventListener("scroll", handleScroll);
      };
    }
  }, [handleScroll]);
  // useEffect(() => {
  //   setLocalAllEvents([ ...element?.products]);
  // }, [element.products]);
  // Check if options is undefined or null before using it
  if (!options || !Array.isArray(options)) {
    // Handle the case when options is undefined or not an array
    const nooptions=['no option available']
    return <div>   
 
    <br />
    <Autocomplete
      value={value}
      onChange={(event: any, newValue: string | null) => {
        setValue(newValue);
        // onChange(event)
  
      }}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      id="controllable-states-demo"
      options={nooptions}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label={label}
   
      onChange={(e) => {
       console.log(e)
        }
      }
      onKeyDown={(e) => {
        if (e.key !== "Escape") {
          // Prevents autoselecting item while typing (default Select behaviour)
          e.stopPropagation();
        }
        if (e.key == "Enter") {
          // setSearch(inputValue);
        }
      }}
      value={inputValue}/>}
      
    />

  </div>
  }
const all=''
  return (
    <>

      <br />

       <Autocomplete
             ref={lastElementRef}
      id="country-select-demo"
      sx={{ width: 300 }}
      options={options}
      value={value}
      onChange={(event: any, newValue: string | null) => {
        setValue(newValue);
         // Create a custom event object with newValue included
   
      const customEvent = {
        ...event,
        target: {
            ...event.target,
            value: newValue
        }
    };
 
       return onChange(customEvent)
      
     
      }}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      autoHighlight
      getOptionLabel={(option) => {
        // Check if the option is defined and not empty
        if (option && option[valuekey]) {
          return option[valuekey];
        } else {
          // Handle the case when the option is empty or undefined
          return all;
        }
      }}
      renderOption={(props, option) => (
        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
       
         {option[valuekey]}
        </Box>
      )}
      renderInput={(params) => {
        // console.log(params,'params')
      return <TextField
          {...params}
          label={label}
          inputProps={{
            ...params.inputProps,
            // autoComplete: 'new-password', // disable autocomplete and autofill
          }}
          // onChange={(e) => {
          //   setSearchText(e.target.value);
          //   if (e.target.value == "") {
          //     setSearch(e.target.value);
          //   }
          // }}
          // onKeyDown={(e) => {
          //   if (e.key !== "Escape") {
          //     // Prevents autoselecting item while typing (default Select behaviour)
          //     e.stopPropagation();
          //   }
          //   if (e.key == "Enter") {
          //     setSearch(inputValue);
          //   }
          // }}
          // value={'OPPOF19'}
        />
      }}
    />
      {/* <IconButton>
      <SearchIcon onClick={() => setSearch(inputValue )} />
        </IconButton> */}
    </>
  );
}

export default UseAutocomplete




