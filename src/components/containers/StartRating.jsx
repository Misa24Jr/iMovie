import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const StarRating = ({
  maxRating = 5,
  onRating,
  filledStarColor = '#3C5252',
  emptyStarColor,
  fontSize
}) => {
  const [rating, setRating] = useState(0);

  const handleSetRating = (rate) => {
    setRating(rate);
    if (onRating) {
      onRating(rate);
    }
    //console.log('Selected rating:', rate); // Log the selected rating
  };

  const renderStars = () => {
    let stars = [];
    for (let i = 1; i <= maxRating; i++) {
      stars.push(
        <TouchableOpacity key={i} onPress={() => handleSetRating(i)}>
          <Text style={{
            marginHorizontal: 6,
            fontSize: fontSize || 30,
            color: i <= rating ? filledStarColor : emptyStarColor,
          }}>
            {i <= rating ? '★' : '☆'}
          </Text>
        </TouchableOpacity>
      );
    }
    return stars;
  };

  return (
    <View style={{ flexDirection: 'row' }}>
      {renderStars()}
    </View>
  );
};

export default StarRating;
