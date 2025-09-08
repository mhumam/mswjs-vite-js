import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Link from '@mui/material/Link';
import axios from 'axios';

const badgeColorStatus = {
	'Out of Stock': 'error',
	'Low Stock': 'warning',
	'In Stock': 'success'
}

export default function BasicTable() {
	const [dataList, setDataList] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPage, setTotalPage] = useState(0);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [isOpen, setIsOpen] = useState(false);
	const [notificationMessage, setNotificationMessage] = useState(null);

	const itemsPerPage = 10;

	const fetchProducts = async (page) => {
		setLoading(true);
		setError(null);

		try {
			const skip = (page - 1) * itemsPerPage;
			const response = await axios.get(`https://dummyjson.com/products?limit=${itemsPerPage}&skip=${skip}`);

			const data = response?.data?.products;
			const total = response?.data?.total;

			setDataList(data);
			setTotalPage(Math.ceil(total / itemsPerPage));
		} catch (err) {
			setError('Failed to fetch products');
			console.error('Error fetching products:', err);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchProducts(currentPage);
	}, [currentPage]);

	const handlePageChange = (_, value) => {
		setCurrentPage(value);
	};

	const handleDelete = async (id) => {
		const response = await axios.delete(`https://dummyjson.com/products/${id}`);
		await setNotificationMessage(response?.data?.data?.message)
		await setIsOpen(true);
	}

	const handleClose = () => setIsOpen(false);

	if (loading) {
		return (
			<Container>
				<Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
					<CircularProgress />
				</Box>
			</Container>
		);
	}

	if (error) {
		return (
			<Container>
				<Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
					<Typography color="error">{error}</Typography>
				</Box>
			</Container>
		);
	}

	return (
		<Container>
			<Snackbar open={isOpen} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
				<Alert
					onClose={handleClose}
					severity="success"
					variant="filled"
					sx={{ width: '100%' }}
				>
					{notificationMessage}
				</Alert>
			</Snackbar>
			<div style={{ margin: '20px 0' }}>
				<Typography variant="h4" component="h4">Product List</Typography>
				<Typography variant="subtitle1" color="textSecondary">
					Page {currentPage} of {totalPage}
				</Typography>
			</div>

			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 650 }} aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell>No</TableCell>
							<TableCell>SKU</TableCell>
							<TableCell>Title</TableCell>
							<TableCell>Availability Status</TableCell>
							<TableCell>Category</TableCell>
							<TableCell>Price</TableCell>
							<TableCell>Action</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{
							dataList?.map((row, key) => {
								const number = ((currentPage - 1) * itemsPerPage) + key + 1;
								return (
									<TableRow key={row.id || key} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
										<TableCell component="th" scope="row">{number}</TableCell>
										<TableCell component="th" scope="row">
											<Link href="#" underline="none">
												{row?.sku}
											</Link>
										</TableCell>
										<TableCell component="th" scope="row">{row?.title}</TableCell>
										<TableCell component="th" scope="row">
											<Chip
												label={row?.availabilityStatus}
												color={badgeColorStatus?.[row?.availabilityStatus] ?? 'default'}
											/>
										</TableCell>
										<TableCell component="th" scope="row">{row?.category}</TableCell>
										<TableCell component="th" scope="row">${row?.price}</TableCell>
										<TableCell>
											<Button variant="outlined" color='error' size='small' onClick={() => handleDelete(row?.id)}>Delete</Button>
										</TableCell>

									</TableRow>
								)
							})
						}
					</TableBody>
				</Table>
			</TableContainer>

			{totalPage > 1 && (
				<div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
					<Pagination
						count={totalPage}
						page={currentPage}
						color="primary"
						shape="rounded"
						onChange={handlePageChange}
					/>
				</div>
			)}
		</Container>
	);
}