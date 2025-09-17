import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { apiGetFeeds } from '@services/actions';
import {
  getIsLoadingFeedsSelector,
  getOrdersFeedsSelector
} from '@services/slices';
import { useAppDispatch, useAppSelector } from '@services/store';

export const Feed: FC = () => {
  const dispatch = useAppDispatch();
  const orders = useAppSelector(getOrdersFeedsSelector);
  const isLoading = useAppSelector(getIsLoadingFeedsSelector);

  useEffect(() => {
    dispatch(apiGetFeeds());
  }, [dispatch]);

  if (isLoading || !orders.length) {
    return <Preloader />;
  }

  const handleGetAllFeeds = () => {
    dispatch(apiGetFeeds());
  };

  return <FeedUI orders={orders} handleGetFeeds={handleGetAllFeeds} />;
};
