import 'package:flutter/material.dart';

TextStyle getHiddenTextStyle(BuildContext context) {
  final base = Theme.of(context).textTheme.bodySmall!;
  return base.copyWith(color: base.color!.withValues(alpha: 0.1));
}
TextStyle getHalfOpacityTextStyle(BuildContext context) {
  final base = Theme.of(context).textTheme.bodyMedium!;
  return base.copyWith(color: base.color!.withValues(alpha: 0.5));
}

({ String path, bool loveToRunBackwards }) getDogImageWithIndex(int dogImageIndex) {
  const assets = [
    ( path: 'public/dogs/american_cocker_spaniel.svg', loveToRunBackwards: false),
    ( path: 'public/dogs/great_pyrenees.svg', loveToRunBackwards: false),
  //( assetPath: 'public/dogs/dog_belgian_groenendael.png', loveToRunBackwards: true ),
  //( assetPath: 'public/dogs/dog_bernese_mountain.png', loveToRunBackwards: false ),
  //( assetPath: 'public/dogs/dog_borzoi.png', loveToRunBackwards: false ),
  //( assetPath: 'public/dogs/dog_english_springer_spaniel.png', loveToRunBackwards: false ),
  //( assetPath: 'public/dogs/dog_great_dane.png', loveToRunBackwards: false ),
  //( assetPath: 'public/dogs/dog_great_pyrenees.png', loveToRunBackwards: true ),
  //( assetPath: 'public/dogs/dog_italian_greyhound2.png', loveToRunBackwards: false ),
  //( assetPath: 'public/dogs/dog_kooikerhondje.png', loveToRunBackwards: false ),
  //( assetPath: 'public/dogs/dog_shetland_sheepdog_blue_merle.png', loveToRunBackwards: true ),
  //( assetPath: 'public/dogs/dog_shetland_sheepdog.png', loveToRunBackwards: true ),
  //( assetPath: 'public/dogs/dog_american_cocker_spaniel.png', loveToRunBackwards: true ),
  ];

  return assets[dogImageIndex % assets.length];
}

