import { useState, useEffect } from 'react';
import axios from 'axios';
/**
 * 일관성있는 백엔드와의 통신을 위해 작성된 커스텀 훅
 *
 *
 * ex)
 * const { data, error, loading } = useAxios('https://api.example.com/data', {
 *     method: 'POST',
 *     headers: {
 *         'Content-Type': 'application/json',
 *     },
 *     body: JSON.stringify({ key: 'value' }),
 * });
 *
 *
 * */
const useAxios = (url, options = {}) => {
    const [data, setData] = useState(null);
    const [loading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                await axios(url,options)
                    .then(res => {
                        setData(res.data);
                    })
                    .finally(() => {
                        setIsLoading(false);
                    });
            } catch (err) {
                setError(err);
                alert(err);
            }
        };
        if (loading) {
            fetchData();
        }
    }, [url,options]);

    return { data, error, loading };
};

export default useAxios;
