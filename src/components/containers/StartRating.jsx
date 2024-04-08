import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const StarRating = ({
  maxRating = 5,
  onRating,
  filledStarColor = '#3C5252', // color predeterminado para estrellas llenas
  emptyStarColor, // color predeterminado para estrellas vacías
  fontSize
}) => {
  const [rating, setRating] = useState(0);

  const handleSetRating = (rate) => {
    setRating(rate);
    if (onRating) {
      onRating(rate);
    }
  };

  const renderStars = () => {
    let stars = [];
    for (let i = 1; i <= maxRating; i++) {
      stars.push(
        <TouchableOpacity key={i} onPress={() => handleSetRating(i)}>
          <Text style={{
            marginHorizontal: 6,
            fontSize: fontSize || 30,
            color: i <= rating ? filledStarColor : emptyStarColor, // Usar el color según el estado de la estrella
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
