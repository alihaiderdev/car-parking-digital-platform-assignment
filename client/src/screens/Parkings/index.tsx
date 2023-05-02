import { Tabs, Alert, notification, Spin } from 'antd';
import TabInfoComponent from '../../components/TabInfo';
import { useGetAreasQuery, useLazyGetParkingsQuery } from '../../store/features/apiSlice';
import { useEffect } from 'react';
import { Area } from '../../models/area.model';
import { openNotificationWithIcon } from '../../utils';
import { Parking, Position } from '../../models/parking.model';
import ScrollToTopComponent from '../../components/ScrollToTop';

export interface IParkingsScreenProps {}

export interface IAreaWiseParkingProps {
  areaId: string;
}

const AreaWiseParking: React.FC<IAreaWiseParkingProps> = ({ areaId }) => {
  const [api, contextHolder] = notification.useNotification();

  const [getAll, { data: getAllData, isLoading: getAllIsLoading, isFetching: getAllIsFetching }] = useLazyGetParkingsQuery();

  useEffect(() => {
    async function getAllParkingByAreaId(areaId: string) {
      try {
        await getAll(areaId);
      } catch (error: any) {
        console.log('Error: ', error.message);
        openNotificationWithIcon(api, 'error', error.message || 'Something went wrong!');
      }
    }
    getAllParkingByAreaId(areaId);
  }, [areaId]);

  return (
    <section
      key={areaId}
      style={{
        display: 'grid',
        gridGap: '1rem',
        gridTemplateColumns: 'repeat(4, 1fr)',
        height: '100%'
      }}
    >
      {contextHolder}
      {getAllIsLoading && getAllIsFetching && (
        <div className="w-full h-full flex items-center justify-center">
          <Spin size="large" />
        </div>
      )}
      {!getAllIsLoading && getAllIsFetching && getAllData?.error ? (
        <Alert message="Error" description={getAllData?.message || 'Something went wrong!'} type="error" showIcon />
      ) : (
        !getAllIsLoading &&
        !getAllIsFetching &&
        getAllData?.success &&
        getAllData?.data?.map((parking: Parking) => {
          const { isBooked, order, title } = parking;

          let positions: Position | {} = {};

          if (parking?.position) {
            const position = parking?.position;
            positions = { gridRowStart: position.rowStart, gridRowEnd: position.rowEnd, gridColumnStart: position.columnStart, gridColumnEnd: position.columnEnd };
          }

          return (
            <div className={`${isBooked ? 'bg-red-400' : 'bg-blue-500'} text-white font-bold text-xl flex items-center justify-center`} style={{ ...positions, order }}>
              <h6>{title}</h6>
            </div>
          );
        })
      )}
    </section>
  );
};

const ParkingsScreen: React.FC<IParkingsScreenProps> = (props) => {
  const { data: getAllData, isLoading: getAllIsLoading, isFetching: getAllIsFetching } = useGetAreasQuery();
  //   const [items, setItems] = useState<Area[]>(getAllData?.data ?? []);

  return (
    <>
      <ScrollToTopComponent />
      <TabInfoComponent title="Area Wise Parkings" />
      {!getAllIsLoading && getAllIsFetching && getAllData?.error ? (
        <Alert message="Error" description={getAllData?.message || 'Something went wrong!'} type="error" showIcon />
      ) : (
        !getAllIsLoading &&
        !getAllIsFetching &&
        getAllData?.success && (
          <Tabs
            defaultActiveKey={getAllData?.data![0]._id}
            items={getAllData?.data?.map((area: Area) => ({ key: area._id, label: area.title, children: <AreaWiseParking areaId={area._id} /> }))}
            tabPosition="left"
          />
        )
      )}
    </>
  );
};

export default ParkingsScreen;
