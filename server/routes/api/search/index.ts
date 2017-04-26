import express from 'express';
import { Api } from '../../../api/twitter';
import { ISearchParams } from '../../../../common/interfaces.d'

export default {
  method: 'get',
  name: '/api/search',
  action: async (req: express.Request, res: express.Response) => {
    const searchParams:ISearchParams = {
      keywords: req.query.keywords,
      longitude: req.query.longitude,
      latitude: req.query.latitude,
      radius: req.query.radius
    };
    
    try {
      const fetchResults = await Api.Fetch(searchParams);
      res.send(fetchResults);
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  }
};