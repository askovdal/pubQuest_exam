import * as React from 'react';
import { useEffect, useRef } from 'react';
import {
  Button,
  chakra,
  ChakraProvider,
  extendTheme,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  withDefaultColorScheme,
} from '@chakra-ui/react';

import { dawaAutocomplete } from 'dawa-autocomplete2';
import './App.css';
import { useForm } from 'react-hook-form';
import { ReactComponent as LogoSvg } from './logo.svg';

interface Form {
  bars: number;
  start: string;
  timeSpent: string;
}

export const App = () => {
  const theme = extendTheme(withDefaultColorScheme({ colorScheme: 'blue' }));

  const startRef = useRef<HTMLInputElement | null>(null);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Form>({ shouldFocusError: false });

  useEffect(() => {
    dawaAutocomplete(startRef.current);
  }, []);

  const onSubmit = handleSubmit((data) => {
    // TODO: Right now "data.bars" isnt a number but a string, fix that
    console.log(data);
  });

  const { ref: startRefCallback, ...startRegisterRest } = register('start', {
    required: true,
  });

  // TODO: Use tss-react

  return (
    <ChakraProvider theme={theme}>
      <chakra.header p={2} borderBottom="1px" borderColor="gray.200">
        <chakra.div w="fit-content" m="auto">
          <LogoSvg height="100%" width="230px" />
        </chakra.div>
      </chakra.header>

      <main>
        <chakra.form onSubmit={onSubmit} p={6} m="auto" maxW="800px">
          <chakra.div display="flex" gap={5}>
            <FormControl isInvalid={!!errors.bars} maxW="350px">
              <FormLabel>Number of bars</FormLabel>
              <NumberInput min={0} max={10}>
                <NumberInputField {...register('bars', { required: true })} />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              <FormErrorMessage>Choose a number of bars</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.start} maxW="350px">
              <FormLabel>Start address</FormLabel>
              <Input
                {...startRegisterRest}
                ref={(e) => {
                  startRefCallback(e);
                  startRef.current = e;
                }}
              />
              <FormErrorMessage>Choose a start address</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.timeSpent} maxW="350px">
              <FormLabel>Time spent at each bar</FormLabel>
              <Input {...register('timeSpent', { required: true })} />
              <FormErrorMessage>
                Write the time spent at each bear
              </FormErrorMessage>
            </FormControl>
          </chakra.div>

          {/* TODO: Walking or cycling */}

          <Button type="submit" mt={4}>
            Calculate route
          </Button>
        </chakra.form>
      </main>
    </ChakraProvider>
  );
};
