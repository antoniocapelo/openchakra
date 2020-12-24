import React, { memo, useState, useEffect, useCallback, FC } from 'react'
import { DropTargetMonitor, useDrop } from 'react-dnd'
import Highlight, { defaultProps } from 'prism-react-renderer'
import { Box, Button, Theme, theme, useClipboard } from '@chakra-ui/react'
import { generateCode } from '~utils/code'
import prismTheme from 'prism-react-renderer/themes/nightOwl'
import { useSelector } from 'react-redux'
import useDispatch from '~hooks/useDispatch'
import { getComponents } from '~core/selectors/components'
import { NativeTypes } from 'react-dnd-html5-backend'
import { getTheme } from '~core/selectors/app'

interface IDropTargetProps {
  onDrop: (props: IDropTargetProps, monitor: DropTargetMonitor) => void
}

const DropTarget: FC<IDropTargetProps> = props => {
  const { onDrop } = props
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: [NativeTypes.FILE],
    drop(item, monitor) {
      console.log('aqui', item)

      if (onDrop) {
        onDrop(props, monitor)
      }
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  })

  const isActive = canDrop && isOver
  console.log({ isActive })

  return (
    <Box
      ref={drop}
      zIndex={40}
      p={0}
      fontSize="sm"
      backgroundColor="red"
      overflow="auto"
      position="absolute"
      top={0}
      bottom={0}
      left={0}
      right={0}
    >
      {props.children}
    </Box>
  )
}

const CodePanel = () => {
  const dispatch = useDispatch()
  const theme = useSelector(getTheme)
  const code = JSON.stringify(theme, null, 2)
  const getFileContentAsString = useCallback(
    (file: File, onFileLoaded: (_: object) => void) => {
      const reader = new FileReader()
      reader.addEventListener('load', event => {
        if (event.target) {
          onFileLoaded(JSON.parse(event.target.result as string))
        } else {
          console.error('Event.target is null while reading file as text', file)
        }
      })
      reader.readAsText(file)
    },
    [],
  )

  const handleFileDrop = useCallback(
    (item: any, monitor: DropTargetMonitor) => {
      if (monitor) {
        const files = monitor.getItem().files
        console.log(files)

        files.forEach((file: File) => {
          if (file.type === 'application/json') {
            getFileContentAsString(file, (themeValue: object) => {
              dispatch.app.setTheme(themeValue as Theme)
            })
          } else {
            console.error('The dropped file is not a json.', file)
          }
        })
      }
    },
    [getFileContentAsString],
  )

  const { onCopy, hasCopied } = useClipboard(code!)

  return (
    <DropTarget onDrop={handleFileDrop}>
      <Button
        onClick={onCopy}
        size="sm"
        position="absolute"
        textTransform="uppercase"
        colorScheme="teal"
        fontSize="xs"
        height="24px"
        top={4}
        right="1.25em"
      >
        {hasCopied ? 'copied' : 'copy'}
      </Button>
      <Highlight
        {...defaultProps}
        theme={prismTheme}
        code={code || '// Formatting code… please wait ✨'}
        language="jsx"
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className} style={style}>
            {tokens.map((line, i) => (
              <div {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </DropTarget>
  )
}

export default memo(CodePanel)
