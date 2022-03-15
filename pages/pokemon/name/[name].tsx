import React, { useEffect, useState } from 'react'
import { Button, Card, Container, Grid, Text } from '@nextui-org/react';
import { GetStaticProps, GetStaticPaths, NextPage } from 'next';
import Image from 'next/image';
import { Layout } from '../../../components/layouts'
import { pokeApi } from '../../../api';
import { Pokemon, PokemonListResponse } from '../../../interfaces';
import { getPokemonInfo, localFavorites } from '../../../utils';

interface Props {
  pokemon: Pokemon;
}

const PokemonByNamePage: NextPage<Props> = ({ pokemon }) => {

  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites: number[] = JSON.parse(localStorage.getItem('favorites') || '[]');
    setIsFavorite(favorites.includes(pokemon.id));
  }, [pokemon.id]);

  const onToggleFavorite = () => {
    localFavorites.toogleFavorite(pokemon.id);
    setIsFavorite(!isFavorite);
  }

  return (
    <Layout title={pokemon.name}>
      <Grid.Container css={{ marginTop: '5px' }} gap={2}>
        <Grid xs={12} sm={4}>
          <Card hoverable css={{ padding: '30px' }}>
            <Card.Body>
              <Card.Image
                src={pokemon.sprites.other?.dream_world.front_default || '/no-image.png'}
                alt={pokemon.name}
                width="100%"
                height={200}
              />
            </Card.Body>
          </Card>
        </Grid>
        <Grid xs={12} sm={8}>
          <Card>
            <Card.Header css={{ display: 'flex', justifyContent: 'space-between' }}>
              <Text h1 transform='capitalize'>{pokemon.name}</Text>
              <Button
                color="gradient"
                ghost
                onClick={onToggleFavorite}
              >
                {isFavorite ? 'Quitar de favoritos' : 'Guardar en favoritos'}
              </Button>
            </Card.Header>
            <Card.Body>
              <Text size={30}>Sprites:</Text>
              <Container display='flex' gap={2}>
                <Image
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.back_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.front_shiny}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.back_shiny}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
              </Container>
            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>
    </Layout>
  )
}

// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes

export const getStaticPaths: GetStaticPaths = async (ctx) => {

  const { data: { results } } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=386');

  return {
    paths: results.map(({ name }) => ({
      params: { name }
    })),
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { name } = params as { name: string };

  return {
    props: {
      pokemon: await getPokemonInfo(name)
    }
  }
}

export default PokemonByNamePage