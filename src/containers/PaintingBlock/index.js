import React, { Component } from 'react'
import Loading from 'components/atoms/loading';
import Error from 'components/atoms/error';
import { Query } from 'react-apollo';
import ContentCard from 'components/molecules/cards/ContentCard';
import { withNavigation } from 'react-navigation';
import { getAllPaintings } from 'utils/Queries';

export class PaintingBlock extends Component {
  render() {
    const onPressed = (id) => {
      const { navigation } = this.props;
      navigation.push('PaintingPage', {
        itemId: id
      })
    }
    return (
      <Query
        pollInterval={500}
        query={getAllPaintings}>
        {({ loading, error, data }) => {
          if (loading) return <Loading />
          if (error) return <Error errorMessage={error.message} />
          return (
            data.paintings.map(e => {
              const date = new Date(parseInt(e.date)).getFullYear()
              return <ContentCard
                date={date}
                title={e.name}
                pictureUrl={e.picture}
                onPress={() => { onPressed(e._id) }}
              />
            })
          );
        }}
      </Query>
    )
  }
}

export default withNavigation(PaintingBlock)