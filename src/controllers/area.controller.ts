import { Request, Response } from 'express';
import { createArea, deleteArea, findArea, findAreas, updateArea } from '../services/area.service';

export async function createAreaHandler(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
  try {
    const area = await createArea(req.body);
    return res.status(201).send({ success: false, error: true, message: 'Area created successfully!', data: area });
  } catch (error: any) {
    console.log(`Error: `.red, error);
    return res.status(409).send({ success: false, error: true, message: error.message });
  }
}

export async function getAreaHandler(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
  try {
    const area = await findArea({ _id: req.params.areaId });
    return res.status(200).send({ success: false, error: true, message: 'Successfully fetch area!', data: area });
  } catch (error: any) {
    console.log(`Error: `.red, error);
    return res.status(500).send({ success: false, error: true, message: error.message });
  }
}

export async function getAreasHandler(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
  try {
    const areas = await findAreas();
    return res.status(200).send({ success: false, error: true, message: 'Successfully fetch all areas!', data: areas });
  } catch (error: any) {
    console.log(`Error: `.red, error);
    return res.status(500).send({ success: false, error: true, message: error.message });
  }
}

export async function updateAreaHandler(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
  try {
    const area = await updateArea({ _id: req.params.areaId }, req.body, { new: true });
    return res.status(200).send({ success: false, error: true, message: 'Area updated successfully!', data: area });
  } catch (error: any) {
    console.log(`Error: `.red, error);
    return res.status(409).send({ success: false, error: true, message: error.message });
  }
}

export async function deleteAreaHandler(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
  try {
    await deleteArea({ _id: req.params.areaId });
    return res.status(200).send({ success: false, error: true, message: 'Area deleted successfully!' });
  } catch (error: any) {
    console.log(`Error: `.red, error);
    return res.status(500).send({ success: false, error: true, message: error.message });
  }
}
