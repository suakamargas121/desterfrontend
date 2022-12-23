import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';
import { useTheme } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

import DButton from '../../components/DButton';
import { Helmet } from '../../components/DHelmet';
import DItemLogo from '../../components/DItemLogo';
import DLoader from '../../components/DLoader';
import DReviewList from '../../components/DReview';
import DSlider from '../../components/DSlider';
import DSpacer from '../../components/DSpacer';
import {
    APP_API_PATH,
    APP_API_VERSION_PATH,
    APP_BACKDROP_QUALITY,
    APP_DESCRIPTION,
    APP_LOGO_QUALITY,
    APP_NAME,
    APP_POSTER_QUALITY,
} from '../../config';
import { humanSize, humanTime } from '../../utilities/human';
import { get } from '../../utilities/requests';
import useBreakpoint from '../../utilities/useBreakpoint';
import {
    HeaderImage,
    ItemBackground,
    LinearGradient,
    PosterImage,
    StyledChipGenre,
    StyledChipInfo,
} from './styles';

const SeriePage = () => {
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [data, setData] = useState<any>({});
    const [requestInfo, setRequestInfo] = useState<any>({
        code: null,
        message: 'An unknown error has occurred.',
        ok: false,
        time_taken: 0,
    });
    const theme = useTheme();
    const breakpoint = useBreakpoint();
    const { seriesId } = useParams();

    useEffect(() => {
        get(`/series/${seriesId}`, setData, setRequestInfo, setIsLoaded);
    }, [seriesId]);

    return isLoaded && requestInfo.ok ? (
        <Box>
            <Helmet>
                <title>{`${APP_NAME} | ${data.title}`}</title>
                <meta name='description' content={APP_DESCRIPTION} />
            </Helmet>
            <Box>
                <Box sx={{ width: '100%', position: 'relative' }}>
                    <ItemBackground>
                        {(breakpoint === 'xs' || breakpoint === 'sm') && (
                            <>
                                <HeaderImage
                                    src={
                                        APP_API_PATH +
                                        APP_API_VERSION_PATH +
                                        '/assets/image/' +
                                        APP_POSTER_QUALITY +
                                        data.poster_path
                                    }
                                    alt={data.title}
                                />
                                <LinearGradient />
                            </>
                        )}
                        {breakpoint !== 'xs' && breakpoint !== 'sm' && (
                            <>
                                <HeaderImage
                                    src={
                                        APP_API_PATH +
                                        APP_API_VERSION_PATH +
                                        '/assets/image/' +
                                        APP_BACKDROP_QUALITY +
                                        data.backdrop_path
                                    }
                                    alt={data.title}
                                />
                                <LinearGradient />
                            </>
                        )}
                    </ItemBackground>
                    <Box
                        sx={{
                            position: 'absolute',
                            zIndex: '20',
                            display: 'flex',
                            height: 'fit-content',
                            flexDirection: 'column',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            marginTop: 'auto',
                            marginLeft: '40px',
                            marginRight: '40px',
                            marginBottom: '40px',
                            [theme.breakpoints.down('md')]: {
                                alignItems: 'center',
                                marginLeft: 'auto',
                                marginRight: 'auto',
                                marginBottom: '10px',
                            },
                        }}
                    >
                        <DItemLogo
                            src={
                                APP_API_PATH +
                                APP_API_VERSION_PATH +
                                '/assets/image/' +
                                APP_LOGO_QUALITY +
                                data.logo_path
                            }
                        />
                        <Typography
                            sx={{
                                fontWeight: '500',
                                paddingBottom: '15px',
                                width: '90%',
                                [theme.breakpoints.down('md')]: {
                                    textAlign: 'center',
                                },
                            }}
                            variant='h5'
                        >
                            {data.title}
                        </Typography>
                        <Grid
                            container
                            sx={{
                                marginTop: '20px',
                                [theme.breakpoints.down('md')]: {
                                    justifyContent: 'center',
                                },
                            }}
                        >
                            <Grid sx={{ marginRight: '5px' }} item>
                                <DButton
                                    startIcon={<i className='ri-play-mini-fill'></i>}
                                    variant='contained'
                                >
                                    PLAY
                                </DButton>
                            </Grid>
                            <Grid sx={{ marginRight: '5px' }} item>
                                <DButton
                                    startIcon={<i className='ri-heart-line'></i>}
                                    color='secondary'
                                    variant='icon'
                                />
                            </Grid>
                            <Grid sx={{ marginRight: '5px' }} item>
                                <DButton
                                    startIcon={<i className='ri-movie-2-line'></i>}
                                    color='secondary'
                                    variant='icon'
                                />
                            </Grid>
                            <Grid item>
                                <DButton
                                    startIcon={<i className='ri-more-2-fill'></i>}
                                    color='secondary'
                                    variant='icon'
                                />
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Grid container p={2}>
                    <Grid
                        item
                        sx={{
                            [theme.breakpoints.down('sm')]: {
                                display: 'none',
                            },
                        }}
                        xs={12}
                        sm={3}
                        md={2}
                    >
                        <Box sx={{ padding: '20px' }}>
                            <PosterImage
                                src={
                                    APP_API_PATH +
                                    APP_API_VERSION_PATH +
                                    '/assets/image/' +
                                    APP_POSTER_QUALITY +
                                    data.poster_path
                                }
                                alt={data.title}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={9} md={10}>
                        <Box sx={{ padding: '20px' }}>
                            <Typography
                                variant='subtitle1'
                                sx={{
                                    color: alpha(theme.palette.text.primary, 0.7),
                                    marginBottom: '10px',
                                }}
                            >
                                Description
                            </Typography>
                            <Typography variant='body2'>{data.description}</Typography>
                            <Box sx={{ marginTop: '20px' }}>
                                <StyledChipInfo className='year' clickable label={data.year} />
                                <StyledChipInfo
                                    className='rating'
                                    clickable
                                    icon={
                                        <i
                                            style={{ color: '#ffd000' }}
                                            className='ri-star-fill'
                                        ></i>
                                    }
                                    label={data.rating}
                                />
                                <StyledChipInfo
                                    className='type'
                                    clickable
                                    icon={
                                        <i
                                            style={{ color: '#ffd000' }}
                                            className={
                                                data.number_of_files
                                                    ? 'ri-movie-2-fill'
                                                    : 'ri-tv-fill'
                                            }
                                        ></i>
                                    }
                                    label={data.number_of_files ? 'Movie' : 'Series'}
                                />
                            </Box>
                            <Box sx={{ marginTop: '10px' }}>
                                {data.genres &&
                                    data.genres.map((genre: any) => (
                                        <Link
                                            style={{ textDecoration: 'none' }}
                                            to={'/browse'}
                                            state={{ genre: genre.name, mediaType: 'series' }}
                                            key={genre.id}
                                        >
                                            <StyledChipGenre
                                                clickable
                                                sx={{ margin: theme.spacing(0.5) }}
                                                label={genre.name}
                                            />
                                        </Link>
                                    ))}
                            </Box>
                            <Grid container sx={{ marginTop: '20px' }}>
                                <Grid item md={7} sx={{ marginBottom: '15px' }}>
                                    <Stack spacing={2}>
                                        {data.crew.Creator.length ? (
                                            <Box sx={{ display: 'flex' }}>
                                                <Typography
                                                    sx={{
                                                        width: '150px',
                                                        fontWeight: '600',
                                                        color: alpha(
                                                            theme.palette.text.primary,
                                                            0.8,
                                                        ),
                                                    }}
                                                    variant='body1'
                                                >
                                                    Creators
                                                </Typography>
                                                <Typography
                                                    sx={{ display: 'flex', alignItems: 'center' }}
                                                    component={'span'}
                                                    variant='body1'
                                                >
                                                    {data.crew.Creator.map(
                                                        (creator: any, i: number) => (
                                                            <Box
                                                                sx={{
                                                                    display: 'flex',
                                                                    flexDirection: 'row',
                                                                }}
                                                                key={creator.id}
                                                            >
                                                                <a
                                                                    href={`https://www.themoviedb.org/person/${creator.id}`}
                                                                    target='_blank'
                                                                    rel='noopener noreferrer'
                                                                    style={{
                                                                        textDecoration: 'none',
                                                                        color: 'inherit',
                                                                    }}
                                                                >
                                                                    {creator.name}
                                                                </a>
                                                                {i <
                                                                data.crew.Creator.length - 1 ? (
                                                                    <DSpacer />
                                                                ) : null}
                                                            </Box>
                                                        ),
                                                    )}
                                                </Typography>
                                            </Box>
                                        ) : null}
                                        {data.crew.Director.length ? (
                                            <Box sx={{ display: 'flex' }}>
                                                <Typography
                                                    sx={{
                                                        width: '150px',
                                                        fontWeight: '600',
                                                        color: alpha(
                                                            theme.palette.text.primary,
                                                            0.8,
                                                        ),
                                                    }}
                                                    variant='body1'
                                                >
                                                    Directors
                                                </Typography>
                                                <Typography
                                                    sx={{ display: 'flex', alignItems: 'center' }}
                                                    component={'span'}
                                                    variant='body1'
                                                >
                                                    {data.crew.Director.map(
                                                        (director: any, i: number) => (
                                                            <Box
                                                                sx={{
                                                                    display: 'flex',
                                                                    flexDirection: 'row',
                                                                }}
                                                                key={director.id}
                                                            >
                                                                <a
                                                                    href={`https://www.themoviedb.org/person/${director.id}`}
                                                                    target='_blank'
                                                                    rel='noopener noreferrer'
                                                                    style={{
                                                                        textDecoration: 'none',
                                                                        color: 'inherit',
                                                                    }}
                                                                >
                                                                    {director.name}
                                                                </a>
                                                                {i <
                                                                data.crew.Director.length - 1 ? (
                                                                    <DSpacer />
                                                                ) : null}
                                                            </Box>
                                                        ),
                                                    )}
                                                </Typography>
                                            </Box>
                                        ) : null}
                                        {data.crew.Screenplay.length ? (
                                            <Box sx={{ display: 'flex' }}>
                                                <Typography
                                                    sx={{
                                                        width: '150px',
                                                        fontWeight: '600',
                                                        color: alpha(
                                                            theme.palette.text.primary,
                                                            0.8,
                                                        ),
                                                    }}
                                                    variant='body1'
                                                >
                                                    Screenplay
                                                </Typography>
                                                <Typography
                                                    sx={{ display: 'flex', alignItems: 'center' }}
                                                    variant='body1'
                                                    component={'span'}
                                                >
                                                    {data.crew.Screenplay.map(
                                                        (screenplay: any, i: number) => (
                                                            <Box
                                                                sx={{
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    [theme.breakpoints.down('sm')]:
                                                                        {
                                                                            flexDirection: 'column',
                                                                        },
                                                                    [theme.breakpoints.up('sm')]: {
                                                                        flexDirection: 'row',
                                                                    },
                                                                }}
                                                                key={screenplay.id}
                                                            >
                                                                <a
                                                                    href={`https://www.themoviedb.org/person/${screenplay.id}`}
                                                                    target='_blank'
                                                                    rel='noopener noreferrer'
                                                                    style={{
                                                                        textDecoration: 'none',
                                                                        color: 'inherit',
                                                                    }}
                                                                >
                                                                    {screenplay.name}
                                                                </a>
                                                                {i <
                                                                data.crew.Screenplay.length - 1 ? (
                                                                    <DSpacer />
                                                                ) : null}
                                                            </Box>
                                                        ),
                                                    )}
                                                </Typography>
                                            </Box>
                                        ) : null}
                                        {data.studios.length ? (
                                            <Box sx={{ display: 'flex' }}>
                                                <Typography
                                                    sx={{
                                                        width: '150px',
                                                        fontWeight: '600',
                                                        color: alpha(
                                                            theme.palette.text.primary,
                                                            0.8,
                                                        ),
                                                    }}
                                                    variant='body1'
                                                >
                                                    Studios
                                                </Typography>
                                                <Typography
                                                    sx={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        flexWrap: 'wrap',
                                                    }}
                                                    variant='body1'
                                                    component={'span'}
                                                >
                                                    {data.studios.map((studio: any, i: number) => (
                                                        <Box
                                                            sx={{
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                [theme.breakpoints.down('sm')]: {
                                                                    flexDirection: 'column',
                                                                },
                                                                [theme.breakpoints.up('sm')]: {
                                                                    flexDirection: 'row',
                                                                },
                                                            }}
                                                            key={studio.id}
                                                        >
                                                            <a
                                                                href={`https://www.themoviedb.org/company/${studio.id}/tv`}
                                                                target='_blank'
                                                                rel='noopener noreferrer'
                                                                style={{
                                                                    textDecoration: 'none',
                                                                    color: 'inherit',
                                                                }}
                                                            >
                                                                {studio.name}
                                                            </a>
                                                            {i < data.studios.length - 1 ? (
                                                                <DSpacer />
                                                            ) : null}
                                                        </Box>
                                                    ))}
                                                </Typography>
                                            </Box>
                                        ) : null}
                                    </Stack>
                                </Grid>
                                <Grid item md={5}>
                                    <Stack spacing={2}>
                                        <Box sx={{ display: 'flex' }}>
                                            <Typography
                                                sx={{
                                                    width: '150px',
                                                    fontWeight: '600',
                                                    color: alpha(theme.palette.text.primary, 0.8),
                                                }}
                                                variant='body1'
                                            >
                                                Episode Runtime
                                            </Typography>
                                            <Typography sx={{ fontWeight: '500' }} variant='body1'>
                                                {humanTime(data.runtime)}
                                            </Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex' }}>
                                            <Typography
                                                sx={{
                                                    width: '150px',
                                                    fontWeight: '600',
                                                    color: alpha(theme.palette.text.primary, 0.8),
                                                }}
                                                variant='body1'
                                            >
                                                Series Size
                                            </Typography>
                                            <Typography sx={{ fontWeight: '500' }} variant='body1'>
                                                {humanSize(data.size)}
                                            </Typography>
                                        </Box>
                                    </Stack>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
                <Box>
                    <DSlider variant='season' title='Seasons' itemData={data} />
                </Box>
                <Box>
                    <DSlider variant='people' title='Cast' itemData={data.cast} />
                </Box>
                <Box>
                    <DSlider variant='item' title='Recommendation' itemData={[]} />
                </Box>
                <Box>
                    <DSlider variant='video' title='Videos' itemData={data.videos} />
                </Box>
                <Box>
                    <DReviewList title='Reviews' itemData={data.reviews} />
                </Box>
            </Box>
        </Box>
    ) : isLoaded && !requestInfo.ok ? (
        <p style={{ marginTop: '200px' }}>{requestInfo.message}</p>
    ) : (
        // Popup with error message
        <DLoader />
    );
};

export default SeriePage;
