import 'package:flutter/material.dart';
import '../utils.dart';

/// 画面の端から端までアニメーションする犬のwidgetです
class AnimatedDog extends StatefulWidget {
  const AnimatedDog({ super.key, required this.controller });
  final AnimatedDogController controller;
  @override
  State<AnimatedDog> createState() => _AnimatedDogState();
}

/// 犬の画像のアニメーション状態を保持します
/// アニメーション中のある地点でCurrentTaskを消去するためのonReachTargetと、
/// アニメーション開始時にTaskInputのsubmitを無効化する機能を持ちます
class _AnimatedDogState extends State<AnimatedDog> with SingleTickerProviderStateMixin {
  late final AnimationController _controller;

  // 犬をアニメーションさせる方法を定義します
  // 1. 画面外右側から、おおよそタスク表示位置まで移動します
  // 2. おおよそタスク表示位置で停止し、何度か上下動します
  // 3. 画面左端外へ抜けていきます
  // 
  // 1,3 は確実に画面外に動かせるよう、相対位置指定します
  // 2   はTask表示サイズを基準に、今は簡易的に絶対位置指定します
  late final Animation<double> _xAnimationFirst;
  late final Animation<double> _xAnimationSecond;
  late final Animation<double> _yAnimation;


  final animationBreak = 0.3;
  final jumpStart = 0.4;
  final jumpEnd = 0.8;
  final animationRestart = 0.9;

  final xTarget = -0.5;

  var dogImageIndex = 0;
  var _hasReachedTarget = false;

  Animation<double> getActiveXAnimation(AnimationController controller) {
    if (controller.value <= animationBreak) {
      return _xAnimationFirst;
    }
    return _xAnimationSecond;
  }


  @override
  void initState() {
    super.initState();

    const durationSeconds = 2;

    const baseY = -10.0;
    const jumpY = -30.0;

    widget.controller;

    _controller = AnimationController(
      vsync: this,
      duration: const Duration(seconds: durationSeconds),
    )
    ..addStatusListener((status) {
      if (status == AnimationStatus.completed) {
        dogImageIndex++;
        _hasReachedTarget = false;
        widget.controller.notifyComplete();
      }
    })
    ..addListener(() {
      if (_controller.value >= jumpStart && !_hasReachedTarget) {
        _hasReachedTarget = true;
        widget.controller.callOnReachTarget();
      }
    });

    _xAnimationFirst = Tween<double>(begin: 1.0, end: xTarget).animate(
      CurvedAnimation(
        parent: _controller,
        curve: Interval(0.0, animationBreak),
      ),
    );
    _xAnimationSecond = Tween<double>(begin: xTarget, end: -1.0).animate(
      CurvedAnimation(
        parent: _controller,
        curve: Interval(animationRestart, 1.0),
      ),
    );

    _yAnimation = TweenSequence<double>([
      // eat, first one bounce
      for (var i = 0; i < 2; i++) 
        TweenSequenceItem(
          tween: Tween(
            begin: i % 2 == 0 ? baseY : jumpY,
            end:   i % 2 == 0 ? jumpY : baseY,
          ),
          weight: 8,
        )
      ,
      // eat, last two bounce
      for (var i = 0; i < 4; i++) 
        TweenSequenceItem(
          tween: Tween(
            begin: i % 2 == 0 ? baseY : jumpY,
            end:   i % 2 == 0 ? jumpY : baseY,
          ),
          weight: 6,
        )
    ]).animate(
      CurvedAnimation(
        parent: _controller, 
        curve: Interval(jumpStart, jumpEnd),
      ),
    );

    widget.controller.bind(() {
      _controller.reset();
      widget.controller.notifyStart();
      _controller.forward();
    });
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _controller,
      builder: (context, child) {
        return Transform.translate(
          offset: Offset(0.0, _yAnimation.value), 
          child: Align(
            alignment: Alignment(
              getActiveXAnimation(_controller).value,
              -1.0,
            ),
            child: FractionalTranslation(
              translation: Offset(
                getActiveXAnimation(_controller).value, 
                -0.5
              ),
              child: child!
            ),
          ),
        );
      },
      child: DogImage(dogImageIndex: dogImageIndex),
    );
  }
}

class AnimatedDogController {
  void Function()? _start;
  void Function()? _onReachTarget;
  void Function()? _onStart;
  void Function()? _onComplete;

  void setOnStart(void Function() callback) {
    _onStart = callback;
  }
  void setOnComplete(void Function() callback) {
    _onComplete = callback;
  }
  void notifyStart() => _onStart?.call();
  void notifyComplete() => _onComplete?.call();
  void bind(void Function() startAnimation) {
    _start = startAnimation;
  }
  void startAnimation() {
    _start?.call();
  }
  void setOnReachTarget(void Function() callback) {
    _onReachTarget = callback;
  }
  void callOnReachTarget() {
    _onReachTarget?.call();
  }
}

class DogImage extends StatelessWidget {
  const DogImage({ super.key, required this.dogImageIndex });

  final int dogImageIndex;

  @override
  Widget build(BuildContext context) {
    final asset = getDogImageWithIndex(dogImageIndex);
    return Transform(
      alignment: Alignment.center,
      transform: Matrix4.identity()..scale(
        asset.loveToRunBackwards ? -1.0 : 1.0, 
        1.0
      ),
      child: Image.asset(
        asset.assetPath,
        width: 200,
      )
    );
  }
}

