import { useEffect, useState } from 'react';
import { useCreateBookingMutation, useGetAreasQuery, useLazyGetParkingsQuery } from '../../store/features/apiSlice';
import { notification, Form, Select, Button, TimePicker } from 'antd';
import TabInfoComponent from '../../components/TabInfo';
import { openNotificationWithIcon, range, validateMessages } from '../../utils';
import { Booking } from '../../models/booking.model';
import { Area } from '../../models/area.model';
import { Parking } from '../../models/parking.model';
import moment from 'moment';
import ScrollToTopComponent from '../../components/ScrollToTop';

const getDisabledHours = (): number[] => {
  //   return Array.from({ length: moment().hour() }, (_, i) => i);
  return range(0, moment().hour());
};

const getDisabledMinutes = (selectedHour: number): number[] => {
  return selectedHour === moment().hour() ? range(0, moment().minute()) : [];
};

const getDisabledSeconds = (selectedHour: number, selectedMinute: number): number[] => {
  return selectedHour === moment().hour() && selectedMinute === moment().minute() ? range(0, moment().second()) : [];
};

export interface IBookedParkingScreenProps {}

const BookedParkingScreen: React.FC<IBookedParkingScreenProps> = (props) => {
  const [api, contextHolder] = notification.useNotification();
  const [parkingsByAreaId, setParkingsByAreaId] = useState<Parking[]>([]);
  const [fields, setFields] = useState<{ name: string[]; value: string }[]>([
    {
      name: ['area'],
      value: ''
    },
    {
      name: ['parking'],
      value: ''
    },
    {
      name: ['startTime'],
      value: ''
    },
    {
      name: ['endTime'],
      value: ''
    }
  ]);

  const [getAllParking, { data: getAllParkingData, isLoading: getAllParkingIsLoading, isFetching: getAllParkingIsFetching }] = useLazyGetParkingsQuery();
  const [bookedParking, { data: bookedParkingData, isLoading: bookedParkingIsLoading }] = useCreateBookingMutation();
  const { data: getAllAreaData, isLoading: getAllAreaIsLoading, isFetching: getAllAreaIsFetching } = useGetAreasQuery();

  async function getAllParkingByAreaId(areaId: string) {
    try {
      await getAllParking(areaId);
    } catch (error: any) {
      console.log('Error: ', error.message);
      openNotificationWithIcon(api, 'error', error.message || 'Something went wrong!');
    }
  }

  useEffect(() => {
    if (bookedParkingData?.success) {
      openNotificationWithIcon(api, 'success', bookedParkingData?.message || 'Success!');
    } else if (bookedParkingData?.error) {
      openNotificationWithIcon(api, 'error', bookedParkingData?.message || 'Something went wrong!');
    }
  }, [JSON.stringify(bookedParkingData)]);

  useEffect(() => {
    if (getAllParkingData?.success) {
      // @ts-ignore
      setParkingsByAreaId(getAllParkingData?.data);
    } else if (getAllParkingData?.error) {
      openNotificationWithIcon(api, 'error', getAllParkingData?.message || 'Something went wrong!');
    }
  }, [JSON.stringify(getAllParkingData)]);

  const onBookedParking = async (values: Booking): Promise<void> => {
    try {
      console.log('Form values: ', values);
      await bookedParking(values);
    } catch (error: any) {
      console.log();
      console.log('Error: ', error.message);
      openNotificationWithIcon(api, 'error', error.message || 'Something went wrong!');
    }
  };
  return (
    <>
      <ScrollToTopComponent />
      {contextHolder} <TabInfoComponent title="Booked Parking" />
      <Form
        className="w-2/4 mx-auto"
        size="large"
        layout="vertical"
        fields={fields}
        onFieldsChange={(changedField, allFields) => {
          // @ts-ignore
          if (changedField[0].name[0] === 'area' && changedField[0].value) {
            getAllParkingByAreaId(changedField[0].value);
          }
        }}
        validateMessages={validateMessages}
        onFinish={onBookedParking}
      >
        <div className="grid grid-cols-12 gap-6 pt-4">
          <div className="col-span-12">
            <Form.Item className="mb-0" label="Area" name="area" rules={[{ required: true }]}>
              <Select
                placeholder="Select area for booked parking!"
                loading={getAllAreaIsLoading || getAllAreaIsFetching}
                options={getAllAreaData?.data?.map((area: Area) => ({ label: area.title, value: area._id }))}
              />
            </Form.Item>
          </div>
          <div className="col-span-12">
            <Form.Item className="mb-0" label="Parking" name="parking" rules={[{ required: true }]}>
              <Select placeholder="Select parking for booked parking!" loading={getAllParkingIsLoading || getAllParkingIsFetching}>
                {parkingsByAreaId?.map((parking: Parking) => (
                  <Select.Option key={parking._id} value={parking._id} disabled={parking.isBooked}>
                    {parking.title}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </div>
          <div className="col-span-12">
            <Form.Item className="mb-0" label="Start Time" name="startTime" rules={[{ required: true }]}>
              <TimePicker
                disabledHours={getDisabledHours}
                disabledMinutes={getDisabledMinutes}
                disabledSeconds={getDisabledSeconds}
                className="w-full"
                placeholder="Select start time!"
                use12Hours={true}
              />
            </Form.Item>
          </div>
          <div className="col-span-12">
            <Form.Item className="mb-0" label="End Time" name="endTime" rules={[{ required: true }]}>
              <TimePicker
                disabledHours={getDisabledHours}
                disabledMinutes={getDisabledMinutes}
                disabledSeconds={getDisabledSeconds}
                className="w-full"
                placeholder="Select end time!"
                use12Hours={true}
              />
            </Form.Item>
          </div>
          <div className="col-span-12">
            <Form.Item className="mt-4">
              <Button type="primary" htmlType="submit" block loading={bookedParkingIsLoading}>
                Book Parking
              </Button>
            </Form.Item>
          </div>
        </div>
      </Form>
    </>
  );
};

export default BookedParkingScreen;
