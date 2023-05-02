import { Table, Alert } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import TabInfoComponent from '../../components/TabInfo';
import { useGetBookingsQuery } from '../../store/features/apiSlice';
import { Booking } from '../../models/booking.model';
import moment from 'moment';
import { duration } from '../../utils';

export interface IBookingScreenProps {}

const BookingScreen: React.FC<IBookingScreenProps> = (props) => {
  const { data: getAllData, isLoading: getAllIsLoading, isFetching: getAllIsFetching } = useGetBookingsQuery();

  const columns: ColumnsType<Booking> = [
    {
      title: 'Area',
      dataIndex: 'area',
      render: (area) => area.title
    },
    {
      title: 'Parking',
      dataIndex: 'parking',
      render: (parking) => parking.title
    },
    {
      title: 'Start time',
      dataIndex: 'startTime',
      render: (startTime) => moment(startTime).format('LTS')
    },
    {
      title: 'End time',
      dataIndex: 'endTime',
      render: (endTime) => moment(endTime).format('LTS')
    },
    {
      title: 'Duration',
      dataIndex: 'duration',
      render: (_, booking: Booking) => {
        const { hours, minutes, seconds, ...resizeTo } = duration(booking.startTime, booking.endTime);
        return `${hours}h ${minutes}m ${seconds}s`;
      }
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      render: (createdAt) => moment(createdAt).format('YYYY-MM-DD')
    }
  ];

  return (
    <>
      <TabInfoComponent title="Bookings" />
      {!getAllIsLoading && getAllIsFetching && getAllData?.error ? (
        <Alert message="Error" description={getAllData?.message || 'Something went wrong!'} type="error" showIcon />
      ) : (
        !getAllIsLoading &&
        !getAllIsFetching &&
        getAllData?.success && (
          <Table
            columns={columns}
            rowKey={(record: Booking) => {
              return record?._id!;
            }}
            dataSource={getAllData?.data}
            bordered
            loading={getAllIsLoading || getAllIsFetching}
            pagination={false}
          />
        )
      )}
    </>
  );
};

export default BookingScreen;
