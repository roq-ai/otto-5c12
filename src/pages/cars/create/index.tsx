import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createCar } from 'apiSdk/cars';
import { Error } from 'components/error';
import { carValidationSchema } from 'validationSchema/cars';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { CompanyInterface } from 'interfaces/company';
import { getCompanies } from 'apiSdk/companies';
import { CarInterface } from 'interfaces/car';

function CarCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: CarInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createCar(values);
      resetForm();
      router.push('/cars');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<CarInterface>({
    initialValues: {
      make: '',
      model: '',
      year: 0,
      location: '',
      company_id: (router.query.company_id as string) ?? null,
    },
    validationSchema: carValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Car
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="make" mb="4" isInvalid={!!formik.errors?.make}>
            <FormLabel>Make</FormLabel>
            <Input type="text" name="make" value={formik.values?.make} onChange={formik.handleChange} />
            {formik.errors.make && <FormErrorMessage>{formik.errors?.make}</FormErrorMessage>}
          </FormControl>
          <FormControl id="model" mb="4" isInvalid={!!formik.errors?.model}>
            <FormLabel>Model</FormLabel>
            <Input type="text" name="model" value={formik.values?.model} onChange={formik.handleChange} />
            {formik.errors.model && <FormErrorMessage>{formik.errors?.model}</FormErrorMessage>}
          </FormControl>
          <FormControl id="year" mb="4" isInvalid={!!formik.errors?.year}>
            <FormLabel>Year</FormLabel>
            <NumberInput
              name="year"
              value={formik.values?.year}
              onChange={(valueString, valueNumber) =>
                formik.setFieldValue('year', Number.isNaN(valueNumber) ? 0 : valueNumber)
              }
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            {formik.errors.year && <FormErrorMessage>{formik.errors?.year}</FormErrorMessage>}
          </FormControl>
          <FormControl id="location" mb="4" isInvalid={!!formik.errors?.location}>
            <FormLabel>Location</FormLabel>
            <Input type="text" name="location" value={formik.values?.location} onChange={formik.handleChange} />
            {formik.errors.location && <FormErrorMessage>{formik.errors?.location}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<CompanyInterface>
            formik={formik}
            name={'company_id'}
            label={'Select Company'}
            placeholder={'Select Company'}
            fetcher={getCompanies}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.name}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'car',
  operation: AccessOperationEnum.CREATE,
})(CarCreatePage);
