
import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Input } from '@mui/material';
import { useState, useEffect } from 'react';
import EnhancedTableHead from '../tableHead';
import CircularProgress from '@mui/material/CircularProgress';


function TableComponent() {


    const [searchValue, setSearch] = useState({ name: '' })
    const [heroes, setHeroes] = useState([]);
    const [initialHeroes, setInitial] = useState([]);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('mass');
    const [isLoaded, setLoaded] = useState(false);


    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    useEffect(() => {
        const requestForUsers = async () => {
            const response = await fetch('https://swapi.dev/api/people/');
            const data = await response.json();
            const birthYears = data.results.map((el) => {
                if (el.birth_year === "unknown") {
                    return el.birth_year
                } else {
                    return +el.birth_year.substring(0, el.birth_year.length - 3)
                }
            });

            data.results.forEach((hero, index) => {
                hero.birth_year = birthYears[index]
                hero.height = +hero.height;
                hero.mass = +hero.mass;
            })

            setHeroes(() => data.results);
            setInitial(() => data.results);
            setLoaded(true);
        };
        requestForUsers();
    }, []);

    useEffect(() => {
        setHeroes(initialHeroes);
        setHeroes(previous => previous.filter((hero) => {
            return hero.name.toLowerCase().includes(searchValue.name.toLowerCase())
        }));

    }, [searchValue]);


    const handleSearch = (event) => {
        setSearch((previous) => ({
            ...previous,
            [event.target.name]: event.target.value
        }));
    };


    function descendingComparator(a, b, orderBy) {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }

    function getComparator(order, orderBy) {

        return order === 'desc'
            ? (a, b) => descendingComparator(a, b, orderBy)
            : (a, b) => -descendingComparator(a, b, orderBy);
    }


    function stableSort(array, comparator) {

        const stabilizedThis = array.map((el, index) => [el, index]);

        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if (orderBy === "birth_year") {
                if (a[0].birth_year === "unknown") {
                    return 1
                }
            }
            if (order !== 0) {
                return order;
            }
            return a[1] - b[1];
        });

        return stabilizedThis.map((el) => el[0]);
    }







    return (
      
        <Box sx={{ width: '100%' }}>
            <Input
                type="text"
                name="name"
                value={searchValue.name}
                placeholder='Search By Name'
                className='search-input'
                onInput={(e) => handleSearch(e)}
            />
            {isLoaded ?
            <Paper sx={{ width: '100%', mb: 2 }}>

                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                    >
                        <EnhancedTableHead
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                            rowCount={heroes.length}
                        />
                        <TableBody>
                            {stableSort(heroes, getComparator(order, orderBy))
                                .map((row, index) => {

                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            role="checkbox"
                                            tabIndex={-1}
                                            key={row.name}

                                        >

                                            <TableCell
                                                component="th"
                                                id={labelId}
                                                scope="row"
                                                padding="none"
                                                className='listItem'
                                            >
                                                {row.name}
                                            </TableCell>
                                            <TableCell align="right" className='listItem'>{row.birth_year === "unknown" ? `${row.birth_year}` : `${row.birth_year}BBY`}</TableCell>
                                            <TableCell align="right" className='listItem'>{row.height}</TableCell>
                                            <TableCell align="right" className='listItem'>{row.mass}</TableCell>
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>

            </Paper>
               :   <CircularProgress className="loader"/>  }

        </Box>
    );
}
export default TableComponent;





