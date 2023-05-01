import { Request, Response } from 'express';
import { createParking, deleteParking, findParking, findParkings, updateParking } from '../services/parking.service';

export async function createParkingHandler(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
  try {
    const parking = await createParking(req.body);
    return res.status(201).send({ success: false, error: true, message: 'Parking created successfully!', data: parking });
  } catch (error: any) {
    console.log(`Error: `.red, error);
    return res.status(409).send({ success: false, error: true, message: error.message });
  }
}

export async function getParkingHandler(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
  try {
    const parking = await findParking({ _id: req.params.parkingId });
    return res.status(200).send({ success: false, error: true, message: 'Successfully fetch parking!', data: parking });
  } catch (error: any) {
    console.log(`Error: `.red, error);
    return res.status(500).send({ success: false, error: true, message: error.message });
  }
}

export async function getParkingsHandler(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
  try {
    let query: any = {};
    if (req.query?.area) {
      query.area = req.query?.area;
    }

    const parkings = await findParkings(query);
    return res.status(200).send({ success: false, error: true, message: 'Successfully fetch all parkings!', data: parkings });
  } catch (error: any) {
    console.log(`Error: `.red, error);
    return res.status(500).send({ success: false, error: true, message: error.message });
  }
}

export async function updateParkingHandler(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
  try {
    const parking = await updateParking({ _id: req.params.parkingId }, req.body, { new: true });

    return res.status(200).send({ success: false, error: true, message: 'Parking updated successfully!', data: parking });
  } catch (error: any) {
    console.log(`Error: `.red, error);
    return res.status(409).send({ success: false, error: true, message: error.message });
  }
}

export async function deleteParkingHandler(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
  try {
    await deleteParking({ _id: req.params.parkingId });
    return res.status(200).send({ success: false, error: true, message: 'Parking deleted successfully!' });
  } catch (error: any) {
    console.log(`Error: `.red, error);
    return res.status(500).send({ success: false, error: true, message: error.message });
  }
}
